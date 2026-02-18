import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthJwtPayload, AuthJwtUser } from './types/jwt.types';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CookieOptions } from 'express';
import * as ms from 'ms';
import type { StringValue } from 'ms';
import { Inject } from '@nestjs/common';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigService, ConfigType } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { UserProfileDto } from '../user/dto/user-profile.dto';
import { CreateUserDto } from '../user/dto/user.dto';
import { AuthProvider } from '../user/types/authProviders.type';
import { PasswordResetService } from '../password-reset/password-reset.service';
import { Request } from 'express';
import { MailService } from '../mailer/mailer.service';
import { SessionService } from '../session/session.service';
import { getReqIP } from '../common/utils/getReqIP';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshJwtConfiguration: ConfigType<
      typeof refreshJwtConfig
    >,
    private readonly passwordResetService: PasswordResetService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly sessionService: SessionService,
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

  async registerByLogin(
    dto: CreateUserDto,
    req: Request,
  ): Promise<{
    profile: UserProfileDto;
    accessToken: string;
    refreshToken: string;
    linkedProviders: { provider: string; providerId: string }[];
  }> {
    const user = await this.userService.createLocalProvider(dto);
    const { accessToken, refreshToken } = await this.generateTokensAndSave(
      user,
      req,
    );

    const profile: UserProfileDto = {
      user: {
        id: user.id,
        nickname: user.nickname,
        username: user.username,
        avatarUrl: user.avatarUrl,
        bio: user.bio,
      },
      stats: {
        followersCount: 0,
        followeesCount: 0,
        postsCount: 0,
      },
    };
    return {
      accessToken,
      refreshToken,
      profile,
      linkedProviders: [{ provider: AuthProvider.LOCAL, providerId: user.id }],
    };
  }

  async login(
    user: AuthJwtUser,
    req: Request,
  ): Promise<{
    profile: UserProfileDto;
    accessToken: string;
    refreshToken: string;
    linkedProviders: { provider: string; providerId: string }[];
  }> {
    const { accessToken, refreshToken } = await this.generateTokensAndSave(
      user,
      req,
    );

    const profile = await this.userService.getProfileData(user.id);
    const providers = await this.userService.getProviders(user.id);
    return { accessToken, refreshToken, profile, linkedProviders: providers };
  }

  private async generateTokensAndSave(user: User | AuthJwtUser, req: Request) {
    const { accessToken, refreshToken } = await this.generateToken(user);
    await this.sessionService.createSession(
      user.id,
      refreshToken,
      getReqIP(req),
      req.headers['user-agent'] || 'unknown',
    );

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
    const session = await this.sessionService.validateRefreshToken(
      userId,
      refreshToken,
    );
    if (!session || !session.user) {
      throw new UnauthorizedException('Invalid Refresh Token');
    }

    return { id: session.user.id, role: session.user.role };
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
      (this.refreshJwtConfiguration.expiresIn as StringValue) || '7d';

    res.cookie('refresh_token', token, {
      ...options,
      sameSite: 'lax',
      maxAge: ms(expiresIn),
    });
  }

  async logout(userId: string, rawRefreshToken: string) {
    await this.sessionService.invalidateSession(userId, rawRefreshToken);
  }

  async validateOAuthUser({
    email,
    nickname,
    username,
    avatarUrl,
    providerId,
    provider,
  }: Pick<User, 'username' | 'nickname' | 'avatarUrl'> & {
    email?: string;
    provider: AuthProvider;
    providerId: string;
  }) {
    return await this.userService.findOrCreateOAuthUser({
      provider,
      providerId,
      nickname,
      username,
      avatarUrl,
      email,
    });
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

  async forgotPassword(email: string, req: Request) {
    const user = await this.userService.findByEmail(email);
    if (!user) return; // anti-enumeration

    const token = await this.passwordResetService.createResetToken(
      user.id,
      req.ip,
      req.headers['user-agent'],
    );

    const link = `${this.configService.getOrThrow('FRONT_ORIGIN')}/${this.configService.getOrThrow('FRONT_RESET_PASSWORD_PATH')}?token=${token}`;

    await this.mailService.sendResetPassword(email, link);
  }

  async resetPassword(token: string, newPassword: string) {
    const record = await this.passwordResetService.validateResetToken(token);
    if (!record) throw new BadRequestException('Invalid or expired token');

    await this.userService.updatePassword(record.user.id, newPassword);
    await this.passwordResetService.markTokenUsed(record.id);
  }
}
