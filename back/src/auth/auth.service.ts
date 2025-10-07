import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthJwtPayload, AuthJwtUser } from './types/jwt.types';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CookieOptions } from 'express';
import * as ms from 'ms';
import { Inject } from '@nestjs/common';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshJwtConfiguration: ConfigType<
      typeof refreshJwtConfig
    >,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException(`User not found`);
    if (!user.password) throw new UnauthorizedException(`Invalid credentials`);

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(user: AuthJwtUser) {
    const { accessToken, refreshToken } = await this.generateToken(user);

    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.userService.updateRefreshToken(user, hashedRefreshToken);
    return { accessToken, refreshToken };
  }

  async generateToken(user: AuthJwtUser) {
    const payload: AuthJwtPayload = { sub: user.id, role: user.role };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshJwtConfiguration),
    ]);

    return { accessToken, refreshToken };
  }

  async validateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<AuthJwtUser> {
    const user = await this.userService.findOne(userId);
    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('Invalid Refresh Token');
    }
    const isMatch = await argon2.verify(user.hashedRefreshToken, refreshToken);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid Refresh Token');
    }

    return { id: user.id, role: user.role };
  }

  getBearerToken(authHeader: string | undefined): string {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid Authorization header format');
    }

    const token = parts[1];

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    return token;
  }
  async validateAccessToken(token: string): Promise<AuthJwtUser> {
    // for ws handshake
    try {
      const payload: AuthJwtPayload = await this.jwtService.verifyAsync(token);
      return { id: payload.sub, role: payload.role };
    } catch {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  attachRefreshTokenToCookie(res: Response, token: string) {
    const options: CookieOptions =
      process.env.NODE_ENV === 'development'
        ? {
            httpOnly: false,
            secure: false,
            signed: false,
          }
        : {
            httpOnly: false,
            secure: false,
            signed: false,
          };
    const expiresIn =
      (this.refreshJwtConfiguration.expiresIn as Parameters<typeof ms>[0]) ||
      '7d';

    res.cookie('refresh_token', token, {
      ...options,
      sameSite: 'strict',
      maxAge: ms(expiresIn),
    });
  }

  async logout(userId: string) {
    await this.userService.deleteRefreshToken(userId);
  }

  async validateGoogleUser({
    email,
    nickname,
    name,
    avatarUrl,
  }: Pick<User, 'email' | 'name' | 'nickname' | 'avatarUrl'>) {
    let user = await this.userService.findByEmail(email);
    if (!user) {
      user = await this.userService.create({
        email,
        nickname,
        name,
        avatarUrl,
        password: null,
      });
    }

    return user;
  }

  buildRedirectUrl(
    rowClientUrl: string | undefined,
    accessToken: string,
  ): string {
    const redirectUrl = rowClientUrl || process.env.FRONT_ORIGIN!;
    const url = new URL(redirectUrl);
    url.searchParams.set('token', accessToken);
    return url.toString();
  }
}
