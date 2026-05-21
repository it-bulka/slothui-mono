import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class OAuthExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(OAuthExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    const message =
      exception instanceof HttpException
        ? exception.message
        : exception instanceof Error
          ? exception.message
          : 'OAuth authentication failed';

    this.logger.error(
      `OAuth callback failed: ${message}`,
      exception instanceof Error ? exception.stack : String(exception),
    );

    const redirectUrl = new URL(`${process.env.FRONT_ORIGIN}/auth/error`);
    redirectUrl.searchParams.set('oauthError', message);
    res.redirect(redirectUrl.toString());
  }
}
