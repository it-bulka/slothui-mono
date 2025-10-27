import { Strategy, Profile } from 'passport-telegram';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { TelepassConfig } from '../config';
import { Injectable } from '@nestjs/common';

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
    const user = await this.authService.validateTelegramUser({
      telegramId: profile.id,
      nickname: profile.displayName,
      name: profile.username || profile.displayName,
      avatarUrl: profile.photo_url || profile.photos?.[0]?.value,
    });

    return { id: user.id, role: user.role };
  }
}
