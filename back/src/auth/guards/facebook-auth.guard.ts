import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { FacebookConfig } from '../config';

@Injectable()
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
