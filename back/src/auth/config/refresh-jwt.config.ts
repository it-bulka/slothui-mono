import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('refresh-jwt', () => ({
  secret: process.env.JWT_REFRESH_SECRET,
  expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
}));
