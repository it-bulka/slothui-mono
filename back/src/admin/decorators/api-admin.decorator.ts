import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

export const ApiAdminCheck = () =>
  applyDecorators(
    ApiOperation({ summary: 'Admin-only health check endpoint' }),
    ApiOkResponse({
      description: 'Returns confirmation string for ADMIN role users',
    }),
    ApiForbiddenResponse({ description: 'Forbidden — ADMIN role required' }),
  );
