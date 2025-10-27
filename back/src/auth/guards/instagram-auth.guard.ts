import { AuthGuard } from '@nestjs/passport';
import { InstagramConfig } from '../config';
import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export class InstagramAuthGuard extends AuthGuard('instagram') {
  constructor(private readonly instaConfig: InstagramConfig) {
    super();
  }
  getAuthenticateOptions(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    return {
      ...this.instaConfig.options,
      state: request.query.returnUrl,
    };
  }
}
