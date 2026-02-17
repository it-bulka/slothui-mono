import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-instagram';
import { InstagramConfig } from '../config';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthProvider } from '../../user/types/authProviders.type';

@Injectable()
export class InstagramStrategy extends PassportStrategy(Strategy, 'instagram') {
  constructor(
    private readonly authService: AuthService,
    private readonly instagramConfig: InstagramConfig,
  ) {
    super(instagramConfig.options);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const name = profile.username;
    if (!name) {
      throw new UnprocessableEntityException(
        'Instagram OAuth failed. No name found.',
      );
    }

    const avatarUrl = (profile._json as { profile_picture_url?: string })
      .profile_picture_url;

    const user = await this.authService.validateOAuthUser({
      nickname: profile.displayName,
      username: name,
      avatarUrl,
      provider: AuthProvider.INSTAGRAM,
      providerId: profile.id,
    });

    return { id: user.id, role: user.role };
  }
}
