import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiConsumes,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

export const ApiGetMessages = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get paginated message history for a chat' }),
    ApiParam({ name: 'chatId', description: 'Chat UUID' }),
    ApiOkResponse({
      description: 'Paginated list of messages in reverse chronological order',
    }),
  );

export const ApiSendMessage = () =>
  applyDecorators(
    ApiOperation({
      summary:
        'Send a message to a chat. Supports text, file attachments, polls, geo-location, post/story/event forwards.',
    }),
    ApiParam({ name: 'chatId', description: 'Chat UUID' }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          text: { type: 'string', example: 'Hello!' },
          files: { type: 'array', items: { type: 'string', format: 'binary' } },
          poll: {
            type: 'string',
            description: 'JSON-serialized CreatePollDto',
          },
          geo: {
            type: 'string',
            description: 'JSON-serialized CreateGeoMessageDto',
          },
          postId: {
            type: 'string',
            format: 'uuid',
            description: 'Forward a post',
          },
          storyId: {
            type: 'string',
            format: 'uuid',
            description: 'Forward a story',
          },
          eventId: {
            type: 'string',
            format: 'uuid',
            description: 'Forward an event',
          },
        },
      },
    }),
    ApiCreatedResponse({
      description: 'Message created and broadcast via WebSocket msg:new event',
    }),
  );

export const ApiSendStoryReaction = () =>
  applyDecorators(
    ApiOperation({
      summary:
        'Send a reaction message to a story author (creates a direct message)',
    }),
    ApiNoContentResponse({ description: 'Reaction sent successfully' }),
  );
