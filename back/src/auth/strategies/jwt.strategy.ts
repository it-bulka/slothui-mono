import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthJwtPayload, AuthJwtUser } from '../types/jwt.types';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfiguration.secret!,
      algorithms: ['HS256'],
    });
  }

  validate(payload: AuthJwtPayload): AuthJwtUser {
    return { id: payload.sub, role: payload.role };
  }
}
