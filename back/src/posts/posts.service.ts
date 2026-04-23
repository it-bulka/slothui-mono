import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { AttachmentsService } from '../attachments/attachments.service';
import { PostDto } from './dto/post.dto';
import { PostPaginatedRes } from './dto/post.dto';
import { UserMapper } from '../user/user-mapper';
import { PostLike } from './entities/postLike.entity';
import { PostSave } from './entities/postSave.entity';
import { EntityManager } from 'typeorm';
import { PollsService } from '../polls/polls.service';
import { CreatePostCommand } from './dto/createPost.dto';
import { GetPostsParams } from './getPostParams';
import { RedisService } from '../redis/redis.service';
import { CACHE_KEYS } from '../redis/redis.cache-keys';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    @InjectRepository(PostLike)
    private readonly postLikeRepo: Repository<PostLike>,
    @InjectRepository(PostSave)
    private readonly postSaveRepo: Repository<PostSave>,
    private readonly attachmentService: AttachmentsService,
    private readonly pollsService: PollsService,
    private readonly cache: RedisService,
  ) {}

  async getMany(params: GetPostsParams): Promise<PostPaginatedRes> {
    const {
      userId,
      targetUserId,
      friendsIds,
      onlyMe,
      cursor,
      limit = 20,
      random,
    } = params;
    const qb = this.postRepo.createQueryBuilder('post');

    if (cursor) {
      const cursorDate = new Date(cursor);
      qb.where('post.createdAt < :cursor', { cursor: cursorDate });
    }

    if (onlyMe && userId) {
      qb.andWhere('post.authorId = :me', { me: userId });
    } else if (targetUserId) {
      qb.andWhere('post.authorId = :target', { target: targetUserId });
    } else if (friendsIds?.length) {
      qb.andWhere('post.authorId IN (:...friends)', { friends: friendsIds });
    }

    if (userId) {
      qb.addSelect(
        `EXISTS (
        SELECT 1 FROM post_like pl
        WHERE pl."postId" = post.id AND pl."userId" = :userId
      )`,
        'isLiked',
      )
        .addSelect(
          `EXISTS (
        SELECT 1 FROM post_save ps
        WHERE ps."postId" = post.id AND ps."userId" = :userId
      )`,
          'isSaved',
        )
        .setParameter('userId', userId);
    }

    qb.addSelect(
      `(SELECT COUNT(*) FROM post_like pl_count WHERE pl_count."postId" = post.id)`,
      'likesCount',
    );

    if (random) qb.orderBy('RANDOM()');
    else qb.orderBy('post.createdAt', 'DESC').addOrderBy('post.id', 'DESC');

    qb.leftJoinAndSelect('post.author', 'author').take(limit + 1);

    const { entities: posts, raw } = await qb.getRawAndEntities<{
      isLiked: boolean;
      isSaved: boolean;
      likesCount: string;
    }>();

    const hasMore = posts.length > limit;
    const visiblePosts = posts.slice(0, limit);
    const lastPost = visiblePosts[visiblePosts.length - 1];
    const postIds = visiblePosts.map((p) => p.id);

    const attachments = await this.attachmentService.getMany('post', postIds);
    const groupedAttachments =
      this.attachmentService.groupByTypeAndParentId(attachments);

    const polls = userId
      ? await this.pollsService.getMany('post', postIds, userId)
      : [];
    const groupedPolls = this.pollsService.groupedByParentId(polls);

    const items: PostDto[] = visiblePosts.map((post, index) => ({
      id: post.id,
      author: UserMapper.toResponse(post.author),
      text: post.text,
      isLiked: raw[index].isLiked,
      isSaved: raw[index].isSaved,
      likesCount: Number(raw[index].likesCount),
      commentsCount: post.commentsCount,
      attachments: groupedAttachments.get(post.id),
      poll: groupedPolls.get(post.id),
    }));

    const nextCursor = lastPost ? lastPost.createdAt.toISOString() : undefined;

    return { items, hasMore, nextCursor };
  }

  async getById({
    postId,
    userId,
  }: {
    postId: string;
    userId: string;
  }): Promise<PostDto> {
    const key = `${CACHE_KEYS.post(postId)}:${userId}`;
    const cached = await this.cache.get<PostDto>(key);
    if (cached) return cached;

    const { entities, raw } = await this.postRepo
      .createQueryBuilder('post')
      .leftJoin('post.author', 'author')
      .addSelect([
        'author.id',
        'author.username',
        'author.nickname',
        'author.avatarUrl',
      ])
      .addSelect(
        `
        EXISTS (
          SELECT 1
          FROM post_like pl
          WHERE pl."postId" = post.id
            AND pl."userId" = :userId
        )
        `,
        'isLiked',
      )
      .addSelect(
        `
        EXISTS (
          SELECT 1
          FROM post_save ps
          WHERE ps."postId" = post.id
            AND ps."userId" = :userId
        )
        `,
        'isSaved',
      )
      .addSelect(
        `(SELECT COUNT(*) FROM post_like pl_count WHERE pl_count."postId" = post.id)`,
        'likesCount',
      )
      .setParameter('userId', userId)
      .where('post.id = :id', { id: postId })
      .getRawAndEntities<{
        isLiked: boolean;
        isSaved: boolean;
        likesCount: string;
      }>();

    const post = entities[0];

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const isLiked = Boolean(raw[0].isLiked);
    const isSaved = Boolean(raw[0].isSaved);
    const likesCount = Number(raw[0].likesCount);

    const attachments = await this.attachmentService.getMany('post', [postId]);
    const groupedAttachments = this.attachmentService.groupByType(attachments);

    const polls = await this.pollsService.getMany('post', [postId], userId);
    const groupedPolls = this.pollsService.groupedByParentId(polls);

    const result: PostDto = {
      id: post.id,
      author: UserMapper.toResponse(post.author),
      text: post.text,
      isLiked,
      isSaved,
      likesCount,
      commentsCount: post.commentsCount,
      attachments: groupedAttachments ?? {
        images: [],
        file: [],
        audio: [],
        video: [],
      },
      poll: groupedPolls.get(post.id),
    };

    await this.cache.set(key, result, 120);
    return result;
  }

  async setLike(postId: string, userId: string) {
    const post = await this.postRepo.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    await this.postLikeRepo.save({
      post: { id: postId },
      user: { id: userId },
    });

    await this.cache.delByPattern(`post:${postId}:*`);
  }

  async deleteLike(postId: string, userId: string) {
    await this.postLikeRepo.delete({
      post: { id: postId },
      user: { id: userId },
    });

    await this.cache.delByPattern(`post:${postId}:*`);
  }

  async countLikes(postId: string): Promise<number> {
    return await this.postLikeRepo.count({
      where: { post: { id: postId } },
    });
  }

  async setSave(postId: string, userId: string) {
    const post = await this.postRepo.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    await this.postSaveRepo.save({
      post: { id: postId },
      user: { id: userId },
    });

    await this.cache.delByPattern(`post:${postId}:*`);
  }

  async deleteSave(postId: string, userId: string) {
    await this.postSaveRepo.delete({
      post: { id: postId },
      user: { id: userId },
    });

    await this.cache.delByPattern(`post:${postId}:*`);
  }

  async countSaves(postId: string): Promise<number> {
    return await this.postSaveRepo.count({
      where: { post: { id: postId } },
    });
  }

  async getSavedPosts(
    userId: string,
    params: { cursor?: string; limit?: number },
  ): Promise<PostPaginatedRes> {
    const { cursor, limit = 50 } = params;

    const qb = this.postSaveRepo
      .createQueryBuilder('save')
      .innerJoinAndSelect('save.post', 'post')
      .innerJoinAndSelect('post.author', 'author')
      .where('save.userId = :userId', { userId });

    if (cursor) {
      qb.andWhere('post.createdAt < :cursor', { cursor: new Date(cursor) });
    }

    qb.orderBy('post.createdAt', 'DESC')
      .addOrderBy('post.id', 'DESC')
      .take(limit + 1);

    const saves = await qb.getMany();

    const hasMore = saves.length > limit;
    const visibleSaves = saves.slice(0, limit);
    const postIds = visibleSaves.map((s) => s.post.id);

    const attachments = await this.attachmentService.getMany('post', postIds);
    const groupedAttachments =
      this.attachmentService.groupByTypeAndParentId(attachments);

    const items: PostDto[] = visibleSaves.map((save) => ({
      id: save.post.id,
      author: UserMapper.toResponse(save.post.author),
      text: save.post.text,
      isLiked: false,
      isSaved: true,
      likesCount: 0,
      commentsCount: save.post.commentsCount,
      attachments: groupedAttachments.get(save.post.id),
    }));

    const lastPost = visibleSaves[visibleSaves.length - 1]?.post;
    const nextCursor = lastPost ? lastPost.createdAt.toISOString() : undefined;

    return { items, hasMore, nextCursor };
  }

  async getLikedPosts(
    userId: string,
    params: { cursor?: string; limit?: number },
  ): Promise<PostPaginatedRes> {
    const { cursor, limit = 50 } = params;

    const qb = this.postLikeRepo
      .createQueryBuilder('like')
      .innerJoinAndSelect('like.post', 'post')
      .innerJoinAndSelect('post.author', 'author')
      .where('like.userId = :userId', { userId });

    if (cursor) {
      qb.andWhere('post.createdAt < :cursor', { cursor: new Date(cursor) });
    }

    qb.orderBy('post.createdAt', 'DESC')
      .addOrderBy('post.id', 'DESC')
      .take(limit + 1);

    const likes = await qb.getMany();

    const hasMore = likes.length > limit;
    const visibleLikes = likes.slice(0, limit);
    const postIds = visibleLikes.map((l) => l.post.id);

    const attachments = await this.attachmentService.getMany('post', postIds);
    const groupedAttachments =
      this.attachmentService.groupByTypeAndParentId(attachments);

    const items: PostDto[] = visibleLikes.map((like) => ({
      id: like.post.id,
      author: UserMapper.toResponse(like.post.author),
      text: like.post.text,
      isLiked: true,
      isSaved: false,
      likesCount: 0,
      commentsCount: like.post.commentsCount,
      attachments: groupedAttachments.get(like.post.id),
    }));

    const lastLikePost = visibleLikes[visibleLikes.length - 1]?.post;
    const nextCursor = lastLikePost
      ? lastLikePost.createdAt.toISOString()
      : undefined;

    return { items, hasMore, nextCursor };
  }

  async createPostText(
    dto: { text: string; authorId: string },
    manager?: EntityManager,
  ) {
    const repo = manager ? manager.getRepository(Post) : this.postRepo;

    const post = repo.create({
      text: dto.text,
      author: { id: dto.authorId },
    });
    const saved = await repo.save(post);

    await Promise.all([
      this.cache.delByPattern(`posts:feed:${dto.authorId}:*`),
      this.cache.del(CACHE_KEYS.postCount(dto.authorId)),
    ]);

    return saved;
  }

  async createPostWithAttachments(
    dto: Extract<CreatePostCommand, { type: 'files' }>,
  ): Promise<PostDto> {
    const post = await this.createPostText({
      text: dto.text || '',
      authorId: dto.authorId,
    });

    const saved = await this.attachmentService.saveAttachments(
      dto.files,
      'post',
      post.id,
    );

    if (!saved.length) {
      await this.postRepo.delete({ id: post.id });
      throw new BadRequestException('Failed to upload attachments to storage');
    }

    return await this.getById({ postId: post.id, userId: dto.authorId });
  }

  async createPostWithPoll(
    dto: Extract<CreatePostCommand, { type: 'poll' }>,
  ): Promise<PostDto> {
    const post = await this.createPostText({
      text: dto.text || '',
      authorId: dto.authorId,
    });
    await this.pollsService.createPoll(dto.poll, 'post', post.id);
    return await this.getById({ postId: post.id, userId: dto.authorId });
  }

  async createPostWithText(
    dto: Extract<CreatePostCommand, { type: 'text' }>,
  ): Promise<PostDto> {
    const post = await this.createPostText({
      text: dto.text || '',
      authorId: dto.authorId,
    });
    return await this.getById({ postId: post.id, userId: dto.authorId });
  }

  async createPost(command: CreatePostCommand) {
    switch (command.type) {
      case 'poll':
        return this.createPostWithPoll(command);

      case 'files':
        return this.createPostWithAttachments(command);

      case 'text':
        return this.createPostWithText(command);
    }
  }

  async deletePost(postId: string, userId: string) {
    const post = await this.postRepo.findOne({
      where: { id: postId, author: { id: userId } },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const deleted = await this.postRepo.remove(post);
    const attachments = await this.attachmentService.getMany('post', [
      deleted.id,
    ]);
    await this.attachmentService.deleteMany(attachments);

    await Promise.all([
      this.cache.delByPattern(`post:${postId}:*`),
      this.cache.delByPattern(`posts:feed:${userId}:*`),
      this.cache.del(CACHE_KEYS.postCount(userId)),
    ]);

    return deleted;
  }

  async countPosts(userId: string) {
    const key = CACHE_KEYS.postCount(userId);
    const cached = await this.cache.get<number>(key);
    if (cached !== null) return cached;

    const count = await this.postRepo.count({
      where: {
        author: { id: userId },
      },
    });
    await this.cache.set(key, count, 300);
    return count;
  }

  async findById(postId: string): Promise<Post | null> {
    return await this.postRepo.findOne({
      where: { id: postId },
      relations: ['author'],
    });
  }

  async findManyByIds(postIds: string[]): Promise<Post[]> {
    if (!postIds.length) return [];
    return await this.postRepo.find({
      where: postIds.map((id) => ({ id })),
      relations: ['author'],
    });
  }
}
