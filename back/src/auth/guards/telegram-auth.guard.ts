import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { TelegramConfig } from '../config/telegram.config';
import { TelegramLoginDto } from '../dto/telegram-login.dto';
import { Request } from 'express';

@Injectable()
export class TelegramHashGuard implements CanActivate {
  constructor(private readonly config: TelegramConfig) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const body = request.body as TelegramLoginDto;

    if (!body?.hash) throw new UnauthorizedException('Invalid Telegram data');
    if (!this.isRecent(body.auth_date))
      throw new UnauthorizedException('Telegram auth data is expired');
    if (!this.verifyHash(body))
      throw new UnauthorizedException('Invalid Telegram hash');

    return true;
  }

  private verifyHash(data: TelegramLoginDto): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hash, deviceId, ...telegramFields } = data;

    const checkString = Object.entries(telegramFields)
      .filter(([, v]) => v !== undefined && v !== null)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');

    const secretKey = crypto
      .createHash('sha256')
      .update(this.config.botToken)
      .digest();

    const hmac = crypto
      .createHmac('sha256', secretKey)
      .update(checkString)
      .digest('hex');

    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(hash));
  }

  private isRecent(authDate: number): boolean {
    return Math.floor(Date.now() / 1000) - authDate < 86400;
  }
}
