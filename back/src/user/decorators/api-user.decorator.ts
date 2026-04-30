import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiConsumes,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UserResponseDto } from '../dto/user-response.dto';

export const ApiGetProfileAnalytics = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get follower growth analytics for the current user',
    }),
    ApiOkResponse({
      description: 'Analytics data for the authenticated user profile',
    }),
  );

export const ApiGetMyProfile = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get the authenticated user full profile' }),
    ApiOkResponse({
      description: 'Returns profile data and linked OAuth providers',
    }),
  );

export const ApiDeleteProfile = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Permanently delete the authenticated user account',
    }),
    ApiNoContentResponse({ description: 'Account deleted successfully' }),
  );

export const ApiUpdateProfile = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update the authenticated user profile' }),
    ApiConsumes('multipart/form-data'),
    ApiOkResponse({
      type: UserResponseDto,
      description: 'Updated user profile',
    }),
  );

export const ApiChangePassword = () =>
  applyDecorators(
    ApiOperation({ summary: 'Change the authenticated user password' }),
    ApiNoContentResponse({ description: 'Password changed successfully' }),
  );

export const ApiSearchUsers = () =>
  applyDecorators(
    ApiOperation({ summary: 'Search users by username or nickname' }),
    ApiOkResponse({ description: 'Paginated list of matching users' }),
  );

export const ApiGetUserProfile = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get full profile data for another user' }),
    ApiParam({ name: 'userId', description: 'Target user UUID' }),
    ApiOkResponse({
      description: 'User profile with follower relationship status',
    }),
    ApiNotFoundResponse({ description: 'User not found' }),
  );

export const ApiGetUserBrief = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get brief user info (id, username, nickname, avatar)',
    }),
    ApiParam({ name: 'userId', description: 'Target user UUID' }),
    ApiOkResponse({ type: UserResponseDto }),
    ApiNotFoundResponse({ description: 'User not found' }),
  );
