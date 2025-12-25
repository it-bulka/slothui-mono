import { Injectable } from '@nestjs/common';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedResponse } from '../common/types/pagination.type';
import { CommentListItemDTO } from './dto/commentItem.dto';
import { checkNextCursor } from '../common/utils/checkNextCursor';
import { UserService } from '../user/user.service';
import { CreateCommentDTO } from './dto/createComment.dto';
import { NotFoundException } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { EditedCommentDTO } from './dto/editedComment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepo: Repository<CommentEntity>,
    private readonly userService: UserService,
  ) {}

  async getPostComments(
    postId: string,
    limit: number = 50,
    cursor?: string,
  ): Promise<PaginatedResponse<CommentEntity>> {
    const qb = this.commentRepo
      .createQueryBuilder('c')
      .where('c.postId = :postId', { postId })
      .andWhere('c.parentId IS NULL');

    if (cursor) {
      qb.andWhere('c.createdAt < :cursor', { cursor });
    }

    const comments = await qb
      .orderBy('c.createdAt', 'DESC')
      .take(limit + 1)
      .getMany();

    const { resultItems, nextCursor, hasMore } = checkNextCursor({
      items: comments,
      cursorField: 'createdAt',
      limit,
    });

    return {
      items: resultItems,
      nextCursor: nextCursor?.toISOString(),
      hasMore,
    };
  }

  async getReplies(
    parentId: string,
    limit: number,
    cursor?: string,
  ): Promise<PaginatedResponse<CommentEntity>> {
    const qb = this.commentRepo
      .createQueryBuilder('c')
      .where('c.parentId = :parentId', { parentId });

    if (cursor) {
      qb.andWhere('c.createdAt < :cursor', { cursor });
    }

    const replies = await qb
      .orderBy('c.createdAt', 'ASC')
      .take(limit)
      .getMany();
    const { resultItems, nextCursor, hasMore } = checkNextCursor({
      items: replies,
      cursorField: 'createdAt',
      limit,
    });

    return {
      items: resultItems,
      nextCursor: nextCursor?.toISOString(),
      hasMore,
    };
  }

  async getRepliesCount(commentIds: string[]) {
    return this.commentRepo
      .createQueryBuilder('c')
      .select('c.parentId', 'parentId')
      .addSelect('COUNT(*)', 'count')
      .where('c.parentId IN (:...ids)', { ids: commentIds })
      .groupBy('c.parentId')
      .getRawMany<{ parentId: string; count: string }>();
  }

  private async buildCommentListItems(
    comments: CommentEntity[],
  ): Promise<CommentListItemDTO[]> {
    if (comments.length === 0) return [];

    const commentIds = comments.map((c) => c.id);
    const authorIds = [...new Set(comments.map((c) => c.authorId))];

    const [counts, users] = await Promise.all([
      this.getRepliesCount(commentIds),
      this.userService.getUsersShort(authorIds),
    ]);

    const countMap = Object.fromEntries(
      counts.map((c) => [c.parentId, Number(c.count)]),
    );

    const usersMap = Object.fromEntries(users.map((u) => [u.id, u]));

    return comments.map((c) => ({
      id: c.id,
      text: c.isDeleted ? null : c.text,
      parentId: c.parentId,
      createdAt: c.createdAt.toISOString(),
      repliesCount: countMap[c.id] ?? 0,
      author: usersMap[c.authorId],
      isEdited: !!c.editedAt,
      ...(c.editedAt ? { editedAt: c.editedAt.toISOString() } : {}),
    }));
  }

  async getPostCommentsDTO(
    postId: string,
    cursor?: string,
  ): Promise<PaginatedResponse<CommentListItemDTO>> {
    const {
      items: comments,
      nextCursor,
      hasMore,
    } = await this.getPostComments(postId, 20, cursor);

    const commentItems = await this.buildCommentListItems(comments);

    return {
      nextCursor,
      hasMore,
      items: commentItems,
    };
  }

  async getRepliesDTO(
    parentId: string,
    cursor?: string,
  ): Promise<PaginatedResponse<CommentListItemDTO>> {
    const {
      items: comments,
      nextCursor,
      hasMore,
    } = await this.getReplies(parentId, 20, cursor);

    const commentItems = await this.buildCommentListItems(comments);

    return {
      nextCursor,
      hasMore,
      items: commentItems,
    };
  }

  async createComment({
    authorId,
    postId,
    parentId,
    text,
  }: CreateCommentDTO & { authorId: string }): Promise<CommentListItemDTO> {
    const comment = await this.commentRepo.save(
      this.commentRepo.create({
        authorId,
        postId,
        text,
        parentId: parentId ?? null,
      }),
    );

    const [dto] = await this.buildCommentListItems([comment]);
    return dto;
  }

  async deleteComment(userId: string, commentId: string): Promise<void> {
    const comment = await this.commentRepo.findOne({
      where: { id: commentId },
    });

    if (!comment)
      throw new NotFoundException(`Comment with id ${commentId} not found`);
    if (comment.authorId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this comment',
      );
    }
    await this.commentRepo.remove(comment);
  }

  async editComment(
    userId: string,
    commentId: string,
    newText: string,
  ): Promise<EditedCommentDTO> {
    const comment = await this.commentRepo.findOne({
      where: { id: commentId },
    });

    if (!comment)
      throw new NotFoundException(`Comment with id ${commentId} not found`);
    if (comment.authorId !== userId) {
      throw new ForbiddenException('You are not allowed to edit this comment');
    }

    comment.text = newText;
    comment.editedAt = new Date();

    await this.commentRepo.save(comment);

    return {
      id: comment.id,
      text: comment.text,
      isEdited: true,
      editedAt: comment.editedAt.toISOString(),
    };
  }
}
