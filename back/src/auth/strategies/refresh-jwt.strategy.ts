import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthJwtPayload, AuthJwtUser } from '../types/jwt.types';
import { Request } from 'express';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AuthService } from '../auth.service';

export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    private readonly authService: AuthService,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshJwtConfiguration: ConfigType<
      typeof refreshJwtConfig
    >,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request): string | null => {
          return (req.cookies?.['refresh_token'] as unknown as string) ?? null;
        },
      ]),
      secretOrKey: refreshJwtConfiguration.secret!,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: AuthJwtPayload): Promise<AuthJwtUser> {
    const userId = payload.sub;
    const token = req.cookies?.['refresh_token'] as unknown as string | null;
    if (!token) {
      throw new UnauthorizedException('Invalid Refresh Token');
    }
    return await this.authService.validateRefreshToken(userId, token);
  }
}
