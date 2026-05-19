import { AuthGuard } from '@nestjs/passport';
import { TwitterConfig } from '../config';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class TwitterAuthGuard extends AuthGuard('twitter') {
  constructor(private readonly config: TwitterConfig) {
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
