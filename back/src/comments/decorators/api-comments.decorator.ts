import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';

export const ApiGetCommentReplies = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get replies for a comment' }),
    ApiParam({ name: 'id', description: 'Parent comment UUID' }),
    ApiOkResponse({ description: 'List of reply comments' }),
  );

export const ApiDeleteComment = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete a comment (author only)' }),
    ApiParam({ name: 'id', description: 'Comment UUID' }),
    ApiNoContentResponse({ description: 'Comment deleted' }),
    ApiNotFoundResponse({ description: 'Comment not found' }),
  );

export const ApiEditComment = () =>
  applyDecorators(
    ApiOperation({ summary: 'Edit a comment text (author only)' }),
    ApiParam({ name: 'id', description: 'Comment UUID' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          text: { type: 'string', example: 'Edited comment text' },
        },
        required: ['text'],
      },
    }),
    ApiOkResponse({ description: 'Updated comment' }),
  );

export const ApiCreateComment = () =>
  applyDecorators(
    ApiOperation({
      summary:
        'Create a comment on a post. Set parentId to reply to another comment.',
    }),
    ApiCreatedResponse({ description: 'Comment created' }),
  );

export const ApiGetPostComments = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get comments for a post (public — no auth required)',
    }),
    ApiParam({ name: 'postId', description: 'Post UUID' }),
    ApiQuery({
      name: 'cursor',
      required: false,
      description: 'Pagination cursor',
    }),
    ApiOkResponse({ description: 'Paginated list of top-level comments' }),
  );
