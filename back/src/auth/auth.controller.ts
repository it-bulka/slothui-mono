import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Response,
  HttpCode,
  Query,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { HttpStatus } from '@nestjs/common';
import { AuthRequest } from '../common/types/user.types';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import {
  FacebookAuthGuard,
  LocalAuthGuard,
  RefreshJwtAuthGuard,
  GoogleAuthGuard,
  InstagramAuthGuard,
  TwitterAuthGuard,
  LinkedInAuthGuard,
  GithubAuthGuard,
  TelegramHashGuard,
} from './guards';
import { TelegramLoginDto } from './dto/telegram-login.dto';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { getRefreshTokenFromReq } from '../common/utils/getRefreshTokenFromReq';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  ApiRegister,
  ApiLogin,
  ApiRefresh,
  ApiLogout,
  ApiOAuthCallback,
  ApiForgotPassword,
  ApiResetPassword,
} from './decorators/api-auth.decorator';
import { Throttle } from '@nestjs/throttler';
import { UseFilters } from '@nestjs/common';
import { OAuthExceptionFilter } from './filters/oauth-exception.filter';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('register')
  @ApiRegister()
  @UseInterceptors(FileInterceptor('avatar'))
  async registerByLogin(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createLocalProvider(createUserDto);
    void this.authService.sendEmailVerification(user.id, user.email!);
    return {
      message:
        'Registration successful. Please check your email to verify your account.',
    };
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiLogin()
  async login(
    @Body('deviceId') deviceId: string,
    @Request() req: AuthRequest,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    const { accessToken, refreshToken, profile, linkedProviders } =
      await this.authService.login(req.user, deviceId, req);

    this.authService.attachRefreshTokenToCookie(res, refreshToken);
    return { profile, token: accessToken, linkedProviders };
  }

  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UseGuards(RefreshJwtAuthGuard)
  @Get('refresh')
  @ApiRefresh()
  async refresh(
    @Request() req: AuthRequest,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    const currentRefreshToken = getRefreshTokenFromReq(req);

    const { accessToken, refreshToken } =
      await this.authService.updateRefreshToken(req.user, currentRefreshToken);
    this.authService.attachRefreshTokenToCookie(res, refreshToken);

    return { token: accessToken };
  }

  @UseGuards(RefreshJwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('logout')
  @ApiLogout()
  async logout(
    @Request() req: AuthRequest,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    if (req.method === 'OPTIONS') return;
    const refreshToken = getRefreshTokenFromReq(req);
    const userId = req.user.id;

    if (refreshToken) {
      await this.authService.logout(userId, refreshToken);
    }

    res.clearCookie('refresh_token');
    return;
  }

  @ApiTags('OAuth')
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  @ApiOperation({
    summary: 'Initiate Google OAuth2 login — redirects to Google consent page',
  })
  googleLogin() {}

  @ApiTags('OAuth')
  @UseFilters(OAuthExceptionFilter)
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  @ApiOAuthCallback('Google')
  async googleCallback(
    @Query('state') state: string,
    @Query('deviceId') deviceId: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state, deviceId });
  }

  @ApiTags('OAuth')
  @UseGuards(FacebookAuthGuard)
  @Get('facebook/login')
  @ApiOperation({ summary: 'Initiate Facebook OAuth2 login' })
  facebookLogin() {}

  @ApiTags('OAuth')
  @UseFilters(OAuthExceptionFilter)
  @UseGuards(FacebookAuthGuard)
  @Get('facebook/callback')
  @ApiOAuthCallback('Facebook')
  async facebookCallback(
    @Query('state') state: string,
    @Query('deviceId') deviceId: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state, deviceId });
  }

  @ApiTags('OAuth')
  @UseGuards(InstagramAuthGuard)
  @Get('instagram/login')
  @ApiOperation({ summary: 'Initiate Instagram OAuth2 login' })
  instagramLogin() {}

  @ApiTags('OAuth')
  @UseFilters(OAuthExceptionFilter)
  @UseGuards(InstagramAuthGuard)
  @Get('instagram/callback')
  @ApiOAuthCallback('Instagram')
  async instagramCallback(
    @Query('state') state: string,
    @Query('deviceId') deviceId: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state, deviceId });
  }

  @ApiTags('OAuth')
  @UseGuards(TwitterAuthGuard)
  @Get('twitter/login')
  @ApiOperation({ summary: 'Initiate Twitter OAuth2 login' })
  twitterLogin() {}

  @ApiTags('OAuth')
  @UseFilters(OAuthExceptionFilter)
  @UseGuards(TwitterAuthGuard)
  @Get('twitter/callback')
  @ApiOAuthCallback('Twitter')
  async twitterCallback(
    @Query('state') state: string,
    @Query('deviceId') deviceId: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state, deviceId });
  }

  @ApiTags('OAuth')
  @UseGuards(LinkedInAuthGuard)
  @Get('linkedin/login')
  @ApiOperation({ summary: 'Initiate LinkedIn OAuth2 login' })
  linkedInLogin() {}

  @ApiTags('OAuth')
  @UseFilters(OAuthExceptionFilter)
  @UseGuards(LinkedInAuthGuard)
  @Get('linkedin/callback')
  @ApiOAuthCallback('LinkedIn')
  async linkedInCallback(
    @Query('state') state: string,
    @Query('deviceId') deviceId: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state, deviceId });
  }

  @ApiTags('OAuth')
  @UseGuards(GithubAuthGuard)
  @Get('github/login')
  @ApiOperation({ summary: 'Initiate GitHub OAuth2 login' })
  githubLogin() {}

  @ApiTags('OAuth')
  @UseFilters(OAuthExceptionFilter)
  @UseGuards(GithubAuthGuard)
  @Get('github/callback')
  @ApiOAuthCallback('GitHub')
  async githubCallback(
    @Query('state') state: string,
    @Query('deviceId') deviceId: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state, deviceId });
  }

  @ApiTags('OAuth')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @UseGuards(TelegramHashGuard)
  @Post('telegram/callback')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate via Telegram Login Widget' })
  async telegramCallback(
    @Body() dto: TelegramLoginDto,
    @Request() req: ExpressRequest,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    const { accessToken, refreshToken, profile, linkedProviders } =
      await this.authService.loginWithTelegram(dto, req);
    this.authService.attachRefreshTokenToCookie(res, refreshToken);
    return { profile, token: accessToken, linkedProviders };
  }

  async _handleOAuthRedirect({
    req,
    res,
    state,
    deviceId,
  }: {
    req: AuthRequest;
    res: ExpressResponse;
    deviceId: string;
    state: string;
  }) {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
      deviceId,
      req,
    );
    const redirectUrl = this.authService.buildRedirectUrl(state, accessToken);
    this.authService.attachRefreshTokenToCookie(res, refreshToken);

    res.redirect(redirectUrl);
  }

  @Throttle({ default: { limit: 3, ttl: 300000 } })
  @Post('forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiForgotPassword()
  async forgotPassword(
    @Body() dto: ForgotPasswordDto,
    @Request() req: ExpressRequest,
  ) {
    await this.authService.forgotPassword(dto.email, req);
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResetPassword()
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto.token, dto.password);
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('verify-email')
  @HttpCode(HttpStatus.NO_CONTENT)
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    await this.authService.verifyEmail(dto.token);
  }

  @Throttle({ default: { limit: 3, ttl: 300000 } })
  @Post('resend-verification')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resendVerification(@Body() dto: ForgotPasswordDto) {
    await this.authService.resendVerification(dto.email);
  }
}
