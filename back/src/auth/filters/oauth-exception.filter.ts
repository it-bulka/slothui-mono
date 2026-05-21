import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class OAuthExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'OAuth authentication failed';

    const redirectUrl = new URL(`${process.env.FRONT_ORIGIN}/auth/error`);
    redirectUrl.searchParams.set('oauthError', message);
    res.redirect(redirectUrl.toString());
  }
}
