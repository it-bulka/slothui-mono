import { AuthGuard } from '@nestjs/passport';
import { LinkedInConfig } from '../config';
import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export class LinkedInAuthGuard extends AuthGuard('linkedin') {
  constructor(private readonly config: LinkedInConfig) {
    super();
  }
  getAuthenticateOptions(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    return {
      ...this.config.options,
      state: request.query.returnUrl,
    };
  }
}
