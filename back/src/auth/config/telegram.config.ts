import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramConfig {
  get botToken(): string {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) throw new Error('TELEGRAM_BOT_TOKEN is missing!');
    return token;
  }
}
