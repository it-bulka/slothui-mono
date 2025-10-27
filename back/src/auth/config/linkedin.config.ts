import { Injectable } from '@nestjs/common';
import { StrategyOption } from 'passport-linkedin-oauth2';

@Injectable()
export class LinkedInConfig {
  get options(): StrategyOption {
    const clientID = process.env.LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    const callbackURL = process.env.LINKEDIN_CALLBACK_URL;

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('LinkedIn OAuth environment variables are missing!');
    }

    return {
      clientID,
      clientSecret,
      callbackURL,
      scope: ['r_emailaddress', 'r_liteprofile'],
    };
  }
}
