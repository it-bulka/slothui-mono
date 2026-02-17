import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { UnprocessableEntityException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { GoogleConfig } from '../config';
import { AuthJwtUser } from '../types/jwt.types';
import { AuthProvider } from '../../user/types/authProviders.type';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private readonly googleConfig: GoogleConfig,
  ) {
    super(googleConfig.options);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<AuthJwtUser> {
    const email = profile.emails?.[0].value;
    if (!email) {
      throw new UnprocessableEntityException(
        'Google OAuth failed. No email found.',
      );
    }

    const name = profile.name?.givenName;
    if (!name) {
      throw new UnprocessableEntityException(
        'Google OAuth failed. No name found.',
      );
    }

    const user = await this.authService.validateOAuthUser({
      email: email,
      nickname: email.split('@')[0],
      username: name,
      avatarUrl: profile.photos?.[0].value,
      providerId: profile.id,
      provider: AuthProvider.GOOGLE,
    });

    return { id: user.id, role: user.role };
  }
}
