import { Injectable } from '@nestjs/common';

@Injectable()
export class TelepassConfig {
  get options() {
    const clientID = process.env.TELEPASS_CLIENT_ID;
    const clientSecret = process.env.TELEPASS_CLIENT_SECRET;
    const callbackURL = process.env.TELEPASS_CALLBACK_URL;

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Telegram OAuth environment variables are missing!');
    }

    return {
      clientID,
      clientSecret,
      callbackURL,
    };
  }
}
