import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { FacebookConfig } from '../config';

export class FacebookAuthGuard extends AuthGuard('facebook') {
  constructor(private readonly fBConfig: FacebookConfig) {
    super();
  }
  getAuthenticateOptions(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    return {
      ...this.fBConfig.options,
      state: request.query.returnUrl,
    };
  }
}
