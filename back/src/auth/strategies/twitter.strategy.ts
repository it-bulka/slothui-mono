import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from '@superfaceai/passport-twitter-oauth2';
import { AuthService } from '../auth.service';
import { TwitterConfig } from '../config';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(
    private readonly authService: AuthService,
    private readonly config: TwitterConfig,
  ) {
    super(config.options);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string | null,
    profile: Profile,
  ) {
    const user = await this.authService.validateTwitterUser({
      twitterId: profile.id,
      nickname: profile.displayName,
      username: profile.username,
      avatarUrl: profile.profileUrl || profile.photos?.[0]?.value,
      email: profile.emails?.[0].value, // might be, but not usually
    });

    return { id: user.id, role: user.role };
  }
}
