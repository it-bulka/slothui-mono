import { Injectable } from '@nestjs/common';
import { StrategyOptions } from '@superfaceai/passport-twitter-oauth2';

@Injectable()
export class TwitterConfig {
  get options(): StrategyOptions {
    const clientID = process.env.TWITTER_CLIENT_ID;
    const clientSecret = process.env.TWITTER_CLIENT_SECRET;
    const callbackURL = process.env.TWITTER_CALLBACK_URL;

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Twitter OAuth environment variables are missing!');
    }

    return {
      clientID,
      clientSecret,
      callbackURL,
      clientType: 'confidential',
    };
  }
}
