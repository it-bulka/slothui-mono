import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiParam,
  ApiNoContentResponse,
} from '@nestjs/swagger';

export const ApiGetSessions = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get all active sessions for the authenticated user',
    }),
    ApiOkResponse({
      description:
        'List of active sessions with device, browser, OS, and location info',
    }),
  );

export const ApiDeleteSession = () =>
  applyDecorators(
    ApiOperation({ summary: 'Invalidate a specific session by ID' }),
    ApiParam({ name: 'sessionId', description: 'Session UUID' }),
    ApiNoContentResponse({ description: 'Session invalidated' }),
  );
