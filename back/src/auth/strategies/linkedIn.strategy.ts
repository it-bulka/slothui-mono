import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Strategy, Profile } from 'passport-linkedin-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { LinkedInConfig } from '../config';
import { AuthService } from '../auth.service';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(
    private readonly authService: AuthService,
    private readonly config: LinkedInConfig,
  ) {
    super({ ...config.options });
    void this.config;
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const email = profile.emails?.[0].value;
    if (!email) {
      throw new UnprocessableEntityException(
        'LinkedIn OAuth failed. No email found.',
      );
    }

    const name = profile.username;
    if (!name) {
      throw new UnprocessableEntityException(
        'LinkedIn OAuth failed. No name found.',
      );
    }

    const avatarUrl =
      (profile.photos?.[0] && profile.photos[0].value) || undefined;

    const user = await this.authService.validateOAuthUser({
      email: email,
      nickname: profile.displayName || email.split('@')[0],
      name,
      avatarUrl,
    });

    return { id: user.id, role: user.role };
  }
}
