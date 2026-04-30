import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';

export const ApiGetCounters = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get notification and activity counters for the current user',
    }),
    ApiOkResponse({
      description:
        'Object with counts for unread messages, notifications, new followers, etc.',
    }),
  );

export const ApiGetFriendsStats = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get follower/following counts for the current user',
    }),
    ApiOkResponse({
      description: 'Object with followersCount and followingCount',
    }),
  );
