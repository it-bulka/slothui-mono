import { Strategy, Profile } from 'passport-telegram';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { TelepassConfig } from '../config';
import { Injectable } from '@nestjs/common';
import { AuthProvider } from '../../user/types/authProviders.type';

@Injectable()
export class TelegramStrategy extends PassportStrategy(Strategy, 'telegram') {
  constructor(
    private readonly authService: AuthService,
    private readonly config: TelepassConfig,
  ) {
    super(config.options);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string | null,
    profile: Profile,
  ) {
    // TODO: check profile data
    const user = await this.authService.validateOAuthUser({
      provider: AuthProvider.TELEGRAM,
      providerId: profile.id,
      nickname: profile.displayName,
      username: profile.username || profile.displayName,
      avatarUrl: profile.photo_url || profile.photos?.[0]?.value,
    });

    return { id: user.id, role: user.role };
  }
}
