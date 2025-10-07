import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleConfig {
  get options() {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const callbackURL = process.env.GOOGLE_REDIRECT_URL;

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Google OAuth environment variables are missing!');
    }

    return {
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
    };
  }
}
