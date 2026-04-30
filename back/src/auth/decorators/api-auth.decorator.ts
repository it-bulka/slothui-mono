import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiCookieAuth,
  ApiNoContentResponse,
  ApiQuery,
} from '@nestjs/swagger';

export const ApiRegister = () =>
  applyDecorators(
    ApiOperation({ summary: 'Register a new user with email and password' }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: 'Registration form data. Avatar is optional.',
      schema: {
        type: 'object',
        properties: {
          username: { type: 'string', example: 'john_doe' },
          nickname: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'john@example.com' },
          password: { type: 'string', example: 'MyStr0ng!Pass' },
          deviceId: { type: 'string', example: 'device-uuid-1234' },
          avatar: { type: 'string', format: 'binary' },
        },
        required: ['username', 'nickname', 'email', 'password', 'deviceId'],
      },
    }),
    ApiCreatedResponse({
      description:
        'User registered and logged in. Returns profile, accessToken, and linkedProviders.',
    }),
    ApiBadRequestResponse({
      description: 'Validation error or email already taken',
    }),
  );

export const ApiLogin = () =>
  applyDecorators(
    ApiOperation({ summary: 'Login with email and password' }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'john@example.com' },
          password: { type: 'string', example: 'MyStr0ng!Pass' },
          deviceId: { type: 'string', example: 'device-uuid-1234' },
        },
        required: ['email', 'password', 'deviceId'],
      },
    }),
    ApiOkResponse({
      description:
        'Login successful. Sets refresh_token cookie. Returns profile, token, and linkedProviders.',
    }),
    ApiUnauthorizedResponse({ description: 'Invalid credentials' }),
  );

export const ApiRefresh = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Refresh access token using the refresh_token cookie',
    }),
    ApiCookieAuth(),
    ApiOkResponse({
      description: 'Returns a new access token. Rotates refresh_token cookie.',
    }),
    ApiUnauthorizedResponse({
      description: 'Missing or invalid refresh token',
    }),
  );

export const ApiLogout = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Logout and invalidate the current refresh token',
    }),
    ApiCookieAuth(),
    ApiNoContentResponse({ description: 'Logout successful' }),
  );

export const ApiOAuthCallback = (provider: string) =>
  applyDecorators(
    ApiOperation({
      summary: `${provider} OAuth2 callback — redirects to frontend with access token`,
    }),
    ApiQuery({ name: 'state', required: false }),
    ApiQuery({ name: 'deviceId', required: false }),
  );

export const ApiForgotPassword = () =>
  applyDecorators(
    ApiOperation({ summary: 'Send a password reset link to the user email' }),
    ApiNoContentResponse({
      description: 'Reset email sent (always 204 to prevent email enumeration)',
    }),
  );

export const ApiResetPassword = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Reset password using the token from the reset email',
    }),
    ApiNoContentResponse({ description: 'Password updated successfully' }),
    ApiBadRequestResponse({ description: 'Invalid or expired token' }),
  );
