import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  private readonly isDev = process.env.NODE_ENV !== 'production';

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(
      `${req.method} ${req.url} [${status}]`,
      exception instanceof Error ? exception.stack : String(exception),
    );

    if (exception instanceof HttpException) {
      const body = exception.getResponse();
      res
        .status(status)
        .json(
          typeof body === 'string'
            ? { statusCode: status, message: body }
            : body,
        );
      return;
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
      this.isDev
        ? {
            statusCode: 500,
            message:
              exception instanceof Error ? exception.message : 'Unknown error',
            stack: exception instanceof Error ? exception.stack : undefined,
          }
        : { statusCode: 500, message: 'Internal server error' },
    );
  }
}
