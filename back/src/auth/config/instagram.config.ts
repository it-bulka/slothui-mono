import { Injectable } from '@nestjs/common';
import { StrategyOption } from 'passport-instagram';

@Injectable()
export class InstagramConfig {
  get options(): StrategyOption {
    const clientID = process.env.INSTAGRAM_CLIENT_ID;
    const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET;
    const callbackURL = process.env.INSTAGRAM_REDIRECT_URL;

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Instagram OAuth environment variables are missing!');
    }

    return {
      clientID,
      clientSecret,
      callbackURL,
    };
  }
}
