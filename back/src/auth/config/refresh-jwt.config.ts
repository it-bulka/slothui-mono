import { registerAs } from '@nestjs/config';
import * as process from 'node:process';
import type { StringValue } from 'ms';

export default registerAs('refresh-jwt', () => ({
  secret: process.env.JWT_REFRESH_SECRET,
  expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as StringValue,
}));
