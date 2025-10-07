import { Catch, ArgumentsHost } from '@nestjs/common';
import { WsExceptionFilter } from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsErrorHelper } from '../helpers/WsErrorHelper';

@Catch()
export class GatewayExceptionsFilter implements WsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient<Socket>();
    const args = host.getArgs();

    // if cb exist on client
    const ack = this.findAckCallback(args);

    const response = WsErrorHelper.getErrorResponse(exception, 'Unknown error');

    if (ack) {
      console.log('filter exception', response);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      ack(response);
    } else {
      client.emit('error', response);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  private findAckCallback(args: unknown[]): Function | null {
    if (Array.isArray(args) && args.length >= 1) {
      for (let i = args.length - 1; i >= Math.max(0, args.length - 3); i--) {
        const arg = args[i];
        if (typeof arg === 'function') {
          return arg;
        }
      }
    }
    return null;
  }
}
