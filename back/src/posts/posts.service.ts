import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) {}

  async getMany({
    limit,
    cursor,
    userId,
  }: {
    userId: string;
    limit: number;
    cursor?: string | null;
  }): Promise<PostPaginatedRes> {
    const qb = this.postRepo.createQueryBuilder('post');

    if (cursor) {
      const cursorDate = new Date(cursor);
      qb.where('post.createdAt < :lastSentAt', { lastSentAt: cursorDate });
    }

    if (userId) {
      qb.addSelect(
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
        .setParameter('userId', userId);
    }

    qb.leftJoinAndSelect('post.author', 'author')
      .orderBy('post.createdAt', 'DESC')
      .addOrderBy('post.id', 'DESC')
      .take(limit + 1);

    const { entities: posts, raw } = await qb.getRawAndEntities<{
      isLiked: boolean;
      isSaved: boolean;
    }>();

    const hasMore = posts.length > limit;
    const visiblePosts = posts.slice(0, limit);
    const lastPost = visiblePosts[visiblePosts.length - 1];

    const postIds = visiblePosts.map((p) => p.id);

    const attachments = await this.attachmentService.getMany('post', postIds);
    const groupedAttachments =
      this.attachmentService.groupByTypeAndParentId(attachments);

    const polls = await this.pollsService.getMany('post', postIds);
    const groupedPolls = this.pollsService.groupedByParentId(polls);

    const postWithExtras: PostDto[] = visiblePosts.map((post, index) => ({
      id: post.id,
      author: UserMapper.toResponse(post.author),
      text: post.text,
      isLiked: raw[index].isLiked,
      isSaved: raw[index].isSaved,
      commentsCount: post.commentsCount,
      attachments: groupedAttachments.get(post.id),
      poll: groupedPolls.get(post.id),
    }));

    const nextCursor = lastPost ? lastPost.createdAt.toISOString() : undefined;

    return {
      items: postWithExtras,
      hasMore,
      nextCursor,
    };
  }

  async getById({
    postId,
    userId,
  }: {
    postId: string;
    userId: string;
  }): Promise<PostDto> {
    const { entities, raw } = await this.postRepo
      .createQueryBuilder('post')
      .leftJoin('post.author', 'author')
      .addSelect([
        'author.id',
        'author.name',
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
      .setParameter('userId', userId)
      .where('post.id = :id', { id: postId })
      .getRawAndEntities<{ isLiked: boolean; isSaved: boolean }>();

    const post = entities[0];

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const isLiked = Boolean(raw[0].isLiked);
    const isSaved = Boolean(raw[0].isSaved);

    const attachments = await this.attachmentService.getMany('post', [postId]);
    const groupedAttachments = this.attachmentService.groupByType(attachments);

    const polls = await this.pollsService.getMany('post', [postId]);
    const groupedPolls = this.pollsService.groupedByParentId(polls);

    return {
      id: post.id,
      author: UserMapper.toResponse(post.author),
      text: post.text,
      isLiked,
      isSaved,
      commentsCount: post.commentsCount,
      attachments: groupedAttachments,
      poll: groupedPolls.get(post.id),
    };
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
  }

  async deleteLike(postId: string, userId: string) {
    await this.postLikeRepo.delete({
      post: { id: postId },
      user: { id: userId },
    });
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
  }

  async deleteSave(postId: string, userId: string) {
    await this.postSaveRepo.delete({
      post: { id: postId },
      user: { id: userId },
    });
  }

  async countSaves(postId: string): Promise<number> {
    return await this.postSaveRepo.count({
      where: { post: { id: postId } },
    });
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
    return await repo.save(post);
  }

  async createPostWithAttachments(
    dto: Extract<CreatePostCommand, { type: 'files' }>,
  ): Promise<PostDto> {
    const post = await this.createPostText({
      text: dto.text || '',
      authorId: dto.authorId,
    });
    await this.attachmentService.saveAttachments(dto.files, 'post', post.id);

    return await this.getById({ postId: post.id, userId: dto.authorId });
  }

  async createPostWithPoll(
    dto: Extract<CreatePostCommand, { type: 'poll' }>,
  ): Promise<PostDto> {
    //TODO: add poll
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

    return deleted;
  }

  async countPosts(userId: string) {
    return await this.postRepo.count({
      where: {
        author: { id: userId },
      },
    });
  }
}
