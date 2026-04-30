import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiParam } from '@nestjs/swagger';

export const ApiGetNotifications = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get paginated notification list for the authenticated user',
    }),
    ApiOkResponse({
      description:
        'Paginated notifications. New notifications are also pushed via notification:new WebSocket event.',
    }),
  );

export const ApiGetUnreadCount = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get the count of unread notifications' }),
    ApiOkResponse({ description: 'Returns { count: number }' }),
  );

export const ApiMarkAllRead = () =>
  applyDecorators(
    ApiOperation({ summary: 'Mark all notifications as read' }),
    ApiOkResponse({ description: 'All notifications marked as read' }),
  );

export const ApiMarkOneRead = () =>
  applyDecorators(
    ApiOperation({ summary: 'Mark a single notification as read' }),
    ApiParam({ name: 'id', description: 'Notification UUID' }),
    ApiOkResponse({ description: 'Notification marked as read' }),
  );
