import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiConsumes,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

export const ApiGetPosts = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get paginated post feed. Pass userId to filter by author.',
    }),
    ApiOkResponse({
      description:
        'Paginated list of posts with author, likes, comments, and optional poll/attachments',
    }),
  );

export const ApiGetMyPosts = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get the authenticated user own posts' }),
    ApiOkResponse({ description: 'Paginated list of the current user posts' }),
  );

export const ApiGetLikedPosts = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get posts liked by the authenticated user' }),
    ApiOkResponse({ description: 'Paginated list of liked posts' }),
  );

export const ApiGetSavedPosts = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get posts saved by the authenticated user' }),
    ApiOkResponse({ description: 'Paginated list of saved posts' }),
  );

export const ApiGetPost = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get a single post by ID' }),
    ApiParam({ name: 'id', description: 'Post UUID' }),
    ApiOkResponse({ description: 'Post with full details' }),
    ApiNotFoundResponse({ description: 'Post not found' }),
  );

export const ApiLikePost = () =>
  applyDecorators(
    ApiOperation({ summary: 'Like a post' }),
    ApiParam({ name: 'id', description: 'Post UUID' }),
    ApiOkResponse({
      description: 'Returns postId, isLiked: true, and updated likeCounts',
    }),
  );

export const ApiUnlikePost = () =>
  applyDecorators(
    ApiOperation({ summary: 'Unlike a post' }),
    ApiParam({ name: 'id', description: 'Post UUID' }),
    ApiOkResponse({
      description: 'Returns postId, isLiked: false, and updated likeCounts',
    }),
  );

export const ApiSavePost = () =>
  applyDecorators(
    ApiOperation({ summary: 'Save a post' }),
    ApiParam({ name: 'id', description: 'Post UUID' }),
    ApiOkResponse({
      description: 'Returns postId, isSaved: true, and updated saveCounts',
    }),
  );

export const ApiUnsavePost = () =>
  applyDecorators(
    ApiOperation({ summary: 'Unsave a post' }),
    ApiParam({ name: 'id', description: 'Post UUID' }),
    ApiOkResponse({
      description: 'Returns postId, isSaved: false, and updated saveCounts',
    }),
  );

export const ApiCreatePost = () =>
  applyDecorators(
    ApiOperation({
      summary:
        'Create a post. Supports text, file attachments (up to 25, max 10MB each), or a poll.',
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          text: { type: 'string', example: 'Hello world!' },
          files: {
            type: 'array',
            items: { type: 'string', format: 'binary' },
            description: 'Up to 25 files, max 10MB each',
          },
          poll: {
            type: 'string',
            description:
              'JSON-serialized CreatePollDto — send as a string field in multipart form',
            example:
              '{"question":"Favorite color?","answers":[{"value":"Red"},{"value":"Blue"}],"multiple":false,"anonymous":false}',
          },
        },
      },
    }),
    ApiCreatedResponse({ description: 'Post created successfully' }),
  );

export const ApiDeletePost = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete a post (owner only)' }),
    ApiParam({ name: 'id', description: 'Post UUID' }),
    ApiNoContentResponse({ description: 'Post deleted' }),
  );
