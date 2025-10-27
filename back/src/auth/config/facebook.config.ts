import { Injectable } from '@nestjs/common';

@Injectable()
export class FacebookConfig {
  get options() {
    const clientID = process.env.FACEBOOK_CLIENT_ID;
    const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
    const callbackURL = process.env.FACEBOOK_REDIRECT_URL;

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Facebook OAuth environment variables are missing!');
    }

    return {
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'public_profile'],
      profileFields: ['id', 'emails', 'name', 'picture.type(large)'],
    };
  }
}
