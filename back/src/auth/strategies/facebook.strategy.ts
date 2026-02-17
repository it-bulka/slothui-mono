import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Strategy, Profile } from 'passport-facebook';
import { PassportStrategy } from '@nestjs/passport';
import { FacebookConfig } from '../config';
import { AuthService } from '../auth.service';
import { AuthProvider } from '../../user/types/authProviders.type';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private readonly authService: AuthService,
    private readonly fBconfig: FacebookConfig,
  ) {
    super(fBconfig.options);
    void this.fBconfig;
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const email = profile.emails?.[0].value;
    if (!email) {
      throw new UnprocessableEntityException(
        'Facebook OAuth failed. No email found.',
      );
    }

    const name = profile.username;
    if (!name) {
      throw new UnprocessableEntityException(
        'Facebook OAuth failed. No name found.',
      );
    }

    const avatarUrl =
      (profile.photos?.[0] && profile.photos[0].value) || undefined;

    const user = await this.authService.validateOAuthUser({
      provider: AuthProvider.FACEBOOK,
      providerId: profile.id,
      email: email,
      nickname: profile.displayName || email.split('@')[0],
      username: name,
      avatarUrl,
    });

    return { id: user.id, role: user.role };
  }
}
