import { WsException } from '@nestjs/websockets';
import { HttpException } from '@nestjs/common';

export class WsErrorHelper {
  static getErrorResponse(
    exception: any,
    defaultMessage?: string,
  ): { ok: false; message: string; [key: string]: any } {
    let response: any = { message: defaultMessage };

    // WsException
    if (exception instanceof WsException) {
      const error = exception.getError();
      response = typeof error === 'string' ? { message: error } : error;
    }
    // HttpException
    else if (exception instanceof HttpException) {
      const error = exception.getResponse();
      response = typeof error === 'string' ? { message: error } : error;
    } else if (exception instanceof Error) {
      response = { message: exception.message };
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return { ok: false, ...response };
  }
}
