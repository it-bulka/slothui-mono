import { AuthGuard } from '@nestjs/passport';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { GoogleConfig } from '../config/google.config';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  constructor(private readonly googleConfig: GoogleConfig) {
    super();
  }
  getAuthenticateOptions(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    return {
      ...this.googleConfig.options,
      state: request.query.returnUrl,
    };
  }
}
