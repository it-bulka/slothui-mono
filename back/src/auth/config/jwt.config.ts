import { JwtModuleOptions } from '@nestjs/jwt';
import { registerAs } from '@nestjs/config';
import type { StringValue } from 'ms';

export default registerAs('jwt', (): JwtModuleOptions => {
  return {
    secret: process.env.JWT_ACCESS_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN as StringValue,
    },
  };
});
