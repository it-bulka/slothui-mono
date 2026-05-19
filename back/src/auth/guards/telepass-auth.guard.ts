import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TelepassConfig } from '../config';

@Injectable()
export class TelepassAuthGuard extends AuthGuard('telegram') {
  constructor(private readonly config: TelepassConfig) {
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
