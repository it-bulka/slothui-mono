import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

export const ApiFollow = () =>
  applyDecorators(
    ApiOperation({
      summary:
        'Follow a user. Emits follower:new WebSocket event to the target.',
    }),
    ApiOkResponse({ description: 'Follow relationship created' }),
  );

export const ApiDeleteFollower = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Remove a follower from the current user followers list',
    }),
    ApiParam({ name: 'userId', description: 'Follower user UUID' }),
    ApiOkResponse({ description: 'Follower removed. Returns { id: userId }' }),
  );

export const ApiUnfollow = () =>
  applyDecorators(
    ApiOperation({ summary: 'Unfollow a user' }),
    ApiParam({ name: 'userId', description: 'Target user UUID to unfollow' }),
    ApiOkResponse({ description: 'Unfollowed. Returns { id: userId }' }),
  );

export const ApiConfirmFollowRequest = () =>
  applyDecorators(
    ApiOperation({
      summary:
        'Accept a follow request. Emits friend:confirmed WebSocket event.',
    }),
    ApiOkResponse({ description: 'Follow request accepted' }),
  );

export const ApiRejectFollowRequest = () =>
  applyDecorators(
    ApiOperation({ summary: 'Reject a follow request' }),
    ApiNoContentResponse({ description: 'Request rejected' }),
  );

export const ApiMarkFollowersSeen = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Mark all new followers as seen (clears the new-follower badge)',
    }),
    ApiOkResponse({ description: 'Returns current timestamp' }),
  );

export const ApiGetFollowers = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get paginated list of followers for a user' }),
    ApiQuery({ name: 'userId', description: 'Target user UUID' }),
    ApiQuery({ name: 'cursor', required: false }),
    ApiQuery({ name: 'limit', required: false, example: 15 }),
    ApiOkResponse({ description: 'Paginated list of follower relationships' }),
  );

export const ApiGetFollowings = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get paginated list of users that a user follows',
    }),
    ApiQuery({ name: 'userId', description: 'Target user UUID' }),
    ApiQuery({ name: 'cursor', required: false }),
    ApiQuery({ name: 'limit', required: false, example: 15 }),
    ApiOkResponse({ description: 'Paginated list of following relationships' }),
  );

export const ApiGetSuggestions = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get suggested users to follow based on social graph',
    }),
    ApiQuery({ name: 'userId', description: 'Current user UUID' }),
    ApiQuery({ name: 'cursor', required: false }),
    ApiQuery({ name: 'limit', required: false, example: 15 }),
    ApiOkResponse({ description: 'Paginated list of suggested users' }),
  );
