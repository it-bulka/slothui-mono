import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { GithubConfig } from '../config';

@Injectable()
export class GithubAuthGuard extends AuthGuard('github') {
  constructor(private readonly config: GithubConfig) {
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
