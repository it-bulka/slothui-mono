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
import { CreatePostDto } from './dto/createPost.dto';

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
      qb.leftJoinAndSelect('post.likes', 'like', 'like.user = :userId', {
        userId,
      }).leftJoinAndSelect('post.saves', 'save', 'save.user = :userId', {
        userId,
      });
    }

    qb.leftJoinAndSelect('post.author', 'author')
      .orderBy('post.createdAt', 'DESC')
      .addOrderBy('post.id', 'DESC')
      .take(limit + 1);

    const posts = await qb.getMany();
    const hasMore = posts.length > limit;
    const postIds = posts.slice(0, limit).map((p) => p.id);

    const attachments = await this.attachmentService.getMany('post', postIds);
    const groupedAttachments =
      this.attachmentService.groupByTypeAndParentId(attachments);

    const postWithAttachments: PostDto[] = posts.map((post) => ({
      id: post.id,
      author: UserMapper.toResponse(post.author),
      content: post.content,
      isLiked: post.likes?.length > 0,
      isSaved: post.saves?.length > 0,
      attachments: groupedAttachments.get(post.id),
    }));

    const lastPost = posts[posts.length - 1];
    const nextCursor = lastPost ? lastPost.createdAt.toISOString() : undefined;

    return {
      items: postWithAttachments,
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
    const post = await this.postRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.likes', 'like', 'like.user = :userId', {
        userId,
      })
      .leftJoinAndSelect('post.saves', 'save', 'save.user = :userId', {
        userId,
      })
      .where('post.id = :id', { id: postId })
      .getOne();

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const isLiked = post?.likes?.length > 0;
    const isSaved = post?.saves?.length > 0;

    const attachments = await this.attachmentService.getMany('post', [postId]);
    const groupedAttachments = this.attachmentService.groupByType(attachments);

    return {
      id: post.id,
      author: UserMapper.toResponse(post.author),
      content: post.content,
      isLiked,
      isSaved,
      attachments: groupedAttachments,
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

  async createPost(
    dto: CreatePostDto & { authorId: string },
  ): Promise<PostDto> {
    const post = this.postRepo.create({
      content: dto.text,
      author: { id: dto.authorId },
    });

    await this.postRepo.save(post);
    await this.attachmentService.saveAttachments(dto.files, 'post', post.id);

    return await this.getById({ postId: post.id, userId: dto.authorId });
  }
}
