declare module 'passport-telegram' {
  import {
    Strategy as PassportStrategy,
    Profile as PassportProfile,
  } from 'passport';

  export interface Profile extends PassportProfile {
    id: string;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    auth_date: number;
    hash: string;
  }

  export interface StrategyOptions {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    passReqToCallback?: boolean;
  }

  export type VerifyCallback = (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any) => void,
  ) => void;

  class TelegramStrategy extends PassportStrategy {
    constructor(options: StrategyOptions, verify: VerifyCallback);
  }

  export { TelegramStrategy as Strategy };
}
