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

export const ApiCreateStory = () =>
  applyDecorators(
    ApiOperation({ summary: 'Upload a new story (image or video)' }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
            description: 'Image or video file',
          },
        },
        required: ['file'],
      },
    }),
    ApiCreatedResponse({
      description: 'Story created and available for 24 hours',
    }),
  );

export const ApiGetUsersWithStory = () =>
  applyDecorators(
    ApiOperation({
      summary:
        'Get users with active stories. Optionally filter by a list of author IDs.',
    }),
    ApiOkResponse({
      description:
        'Paginated list of users with their story count and unseen status',
    }),
  );

export const ApiGetMyStories = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get stories created by the authenticated user' }),
    ApiOkResponse({ description: 'List of the current user stories' }),
  );

export const ApiGetUserStories = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get stories created by a specific user' }),
    ApiParam({ name: 'userId', description: 'Target user UUID' }),
    ApiOkResponse({ description: 'List of user stories' }),
  );

export const ApiDeleteStory = () =>
  applyDecorators(
    ApiOperation({ summary: 'Delete a story (author only)' }),
    ApiParam({ name: 'storyId', description: 'Story UUID' }),
    ApiNoContentResponse({ description: 'Story deleted' }),
    ApiNotFoundResponse({ description: 'Story not found' }),
  );

export const ApiMarkStoriesViewed = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Mark multiple stories as viewed in a single request',
    }),
    ApiBody({
      schema: { type: 'array', items: { type: 'string', format: 'uuid' } },
    }),
    ApiNoContentResponse({ description: 'Views recorded' }),
  );

export const ApiGetStoryViews = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get the list of users who viewed a story' }),
    ApiParam({ name: 'storyId', description: 'Story UUID' }),
    ApiOkResponse({ description: 'Paginated list of viewers' }),
  );

export const ApiSetStoryView = () =>
  applyDecorators(
    ApiOperation({ summary: 'Mark a single story as viewed' }),
    ApiParam({ name: 'storyId', description: 'Story UUID' }),
    ApiNoContentResponse({ description: 'View recorded' }),
  );
