import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Strategy, Profile } from 'passport-github2';
import { PassportStrategy } from '@nestjs/passport';
import { GithubConfig } from '../config';
import { AuthService } from '../auth.service';
import { AuthProvider } from '../../user/types/authProviders.type';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly authService: AuthService,
    private readonly config: GithubConfig,
  ) {
    super({ ...config.options });
    void this.config;
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const name =
      profile.username || profile.name
        ? `${profile.name!.givenName} ${profile.name!.familyName}`
        : null;

    if (!name) {
      throw new UnprocessableEntityException(
        'Github OAuth failed. No name found.',
      );
    }

    const user = await this.authService.validateOAuthUser({
      provider: AuthProvider.GITHUB,
      providerId: profile.id,
      nickname: profile.displayName,
      username: name,
      avatarUrl: profile.profileUrl || profile.photos?.[0]?.value,
      email: profile.emails?.[0].value, // might be, but not usually
    });
    return { id: user.id, role: user.role };
  }
}
