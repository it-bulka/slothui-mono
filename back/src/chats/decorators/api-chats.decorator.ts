import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

export const ApiCreateChat = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create a new chat (private or group)' }),
    ApiCreatedResponse({
      description:
        'Chat created. Also emits chat:created WebSocket event to all members.',
    }),
  );

export const ApiGetChats = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get all chats the current user is a member of' }),
    ApiOkResponse({
      description: 'List of chats with last message and member info',
    }),
  );

export const ApiGlobalSearch = () =>
  applyDecorators(
    ApiOperation({ summary: 'Global search across public chats and users' }),
    ApiQuery({ name: 'search', description: 'Search term' }),
    ApiQuery({ name: 'limit', required: false }),
    ApiOkResponse({ description: 'Mixed list of chat and user results' }),
  );

export const ApiSearchMyChats = () =>
  applyDecorators(
    ApiOperation({ summary: 'Search within the current user own chats' }),
    ApiQuery({ name: 'search', description: 'Search term' }),
    ApiQuery({ name: 'limit', required: false }),
    ApiOkResponse({ description: 'Filtered list of the user chats' }),
  );

export const ApiFindPrivateChat = () =>
  applyDecorators(
    ApiOperation({ summary: 'Find or create a private chat with a user' }),
    ApiParam({ name: 'userId', description: 'The other user UUID' }),
    ApiOkResponse({ description: 'Existing or newly created private chat' }),
  );

export const ApiDeleteChat = () =>
  applyDecorators(
    ApiOperation({
      summary:
        'Delete a chat (owner only). Emits chat:deleted WebSocket event.',
    }),
    ApiParam({ name: 'id', description: 'Chat UUID' }),
    ApiOkResponse({
      description: 'Returns the deleted chat and deleted: true',
    }),
    ApiNotFoundResponse({
      description: 'Chat not found or user is not the owner',
    }),
  );

export const ApiUpdateChatMembers = () =>
  applyDecorators(
    ApiOperation({ summary: 'Add or remove members from a group chat' }),
    ApiParam({ name: 'id', description: 'Chat UUID' }),
    ApiOkResponse({ description: 'Updated chat members list' }),
  );

export const ApiMarkChatRead = () =>
  applyDecorators(
    ApiOperation({ summary: 'Mark all messages in a chat as read' }),
    ApiParam({ name: 'chatId', description: 'Chat UUID' }),
    ApiOkResponse({ description: 'Unread count reset to 0' }),
  );
