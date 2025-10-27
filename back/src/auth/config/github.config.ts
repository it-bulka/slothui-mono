import { Injectable } from '@nestjs/common';
import { StrategyOptions } from 'passport-github2';

@Injectable()
export class GithubConfig {
  get options(): StrategyOptions {
    const clientID = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const callbackURL = process.env.GITHUB_CALLBACK_URL;

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Github OAuth environment variables are missing!');
    }

    return {
      clientID,
      clientSecret,
      callbackURL,
    };
  }
}
