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
  TelepassAuthGuard,
} from './guards';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { getRefreshTokenFromReq } from '../common/utils/getRefreshTokenFromReq';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  async registerByLogin(
    @Body() createUserDto: CreateUserDto,
    @Request() req: ExpressRequest,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    const user = await this.userService.createLocalProvider(createUserDto);

    const { accessToken, refreshToken, profile, linkedProviders } =
      await this.authService.login(
        {
          id: user.id,
          role: user.role,
        },
        createUserDto.deviceId,
        req,
      );
    this.authService.attachRefreshTokenToCookie(res, refreshToken);

    return { profile, accessToken, linkedProviders };
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
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

  @UseGuards(RefreshJwtAuthGuard)
  @Get('refresh')
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

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(
    @Query('state') state: string,
    @Query('deviceId') deviceId: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state, deviceId });
  }

  @UseGuards(FacebookAuthGuard)
  @Get('facebook/login')
  facebookLogin() {}

  @UseGuards(FacebookAuthGuard)
  @Get('facebook/callback')
  async facebookCallback(
    @Query('state') state: string,
    @Query('deviceId') deviceId: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state, deviceId });
  }

  @UseGuards(InstagramAuthGuard)
  @Get('instagram/login')
  instagramLogin() {}

  @UseGuards(InstagramAuthGuard)
  @Get('instagram/callback')
  async instagramCallback(
    @Query('state') state: string,
    @Query('deviceId') deviceId: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state, deviceId });
  }

  @UseGuards(TwitterAuthGuard)
  @Get('twitter/login')
  twitterLogin() {}

  @UseGuards(TwitterAuthGuard)
  @Get('twitter/callback')
  async twitterCallback(
    @Query('state') state: string,
    @Query('deviceId') deviceId: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state, deviceId });
  }

  @UseGuards(LinkedInAuthGuard)
  @Get('linkedin/login')
  linkedInLogin() {}

  @UseGuards(LinkedInAuthGuard)
  @Get('linkedin/callback')
  async linkedInCallback(
    @Query('state') state: string,
    @Query('deviceId') deviceId: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state, deviceId });
  }

  @UseGuards(GithubAuthGuard)
  @Get('github/login')
  githubLogin() {}

  @UseGuards(GithubAuthGuard)
  @Get('github/callback')
  async githubCallback(
    @Query('state') state: string,
    @Query('deviceId') deviceId: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state, deviceId });
  }

  @UseGuards(TelepassAuthGuard)
  @Get('telegram/login')
  // TELEGRAM via TELEPASS
  telegramLogin() {}

  @UseGuards(TelepassAuthGuard)
  @Get('telegram/callback')
  async telegramCallback(
    @Query('state') state: string,
    @Query('deviceId') deviceId: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state, deviceId });
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

  @Post('forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(
    @Body() dto: ForgotPasswordDto,
    @Request() req: ExpressRequest,
  ) {
    await this.authService.forgotPassword(dto.email, req);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto.token, dto.password);
  }
}
