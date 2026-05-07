import { WsException } from '@nestjs/websockets';
import { HttpException, Logger } from '@nestjs/common';

const logger = new Logger('WsErrorHelper');

interface ErrorObject {
  message?: string;
  statusCode?: number;
}

function isErrorObject(val: unknown): val is ErrorObject {
  return typeof val === 'object' && val !== null;
}

export class WsErrorHelper {
  static getErrorResponse(
    exception: unknown,
    defaultMessage?: string,
  ): { ok: false; message: string; statusCode: number } {
    logger.error(
      exception instanceof Error ? exception.stack : String(exception),
    );

    if (exception instanceof WsException) {
      const error: string | object = exception.getError();
      if (typeof error === 'string') {
        return { ok: false, message: error, statusCode: 400 };
      }
      if (isErrorObject(error)) {
        return {
          ok: false,
          message: error.message ?? defaultMessage ?? 'WS error',
          statusCode: error.statusCode ?? 400,
        };
      }
    }

    if (exception instanceof HttpException) {
      const body: string | object = exception.getResponse();
      if (typeof body === 'string') {
        return { ok: false, message: body, statusCode: exception.getStatus() };
      }
      if (isErrorObject(body)) {
        return {
          ok: false,
          message: body.message ?? defaultMessage ?? 'Error',
          statusCode: exception.getStatus(),
        };
      }
    }

    return {
      ok: false,
      message: defaultMessage ?? 'Internal server error',
      statusCode: 500,
    };
  }
}
