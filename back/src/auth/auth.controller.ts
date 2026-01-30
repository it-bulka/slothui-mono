import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  Response,
  HttpCode,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { HttpStatus } from '@nestjs/common';
import { AuthRequest } from '../common/types/user.types';
import { Response as ExpressResponse } from 'express';
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
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    const user = await this.userService.create(createUserDto);

    const { accessToken, refreshToken, profile } = await this.authService.login(
      {
        id: user.id,
        role: user.role,
      },
    );
    this.authService.attachRefreshTokenToCookie(res, refreshToken);

    return { profile, accessToken };
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Request() req: AuthRequest,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    const { accessToken, refreshToken, profile } = await this.authService.login(
      req.user,
    );
    this.authService.attachRefreshTokenToCookie(res, refreshToken);

    return { profile, token: accessToken };
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Get('refresh')
  async refresh(
    @Request() req: AuthRequest,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );
    this.authService.attachRefreshTokenToCookie(res, refreshToken);

    return { token: accessToken };
  }

  @UseGuards(RefreshJwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('logout')
  async logout(@Request() req: AuthRequest) {
    await this.authService.logout(req.user.id);
    return;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(
    @Query('state') state: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state });
  }

  @UseGuards(FacebookAuthGuard)
  @Get('facebook/login')
  facebookLogin() {}

  @UseGuards(FacebookAuthGuard)
  @Get('facebook/callback')
  async facebookCallback(
    @Query('state') state: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state });
  }

  @UseGuards(InstagramAuthGuard)
  @Get('instagram/login')
  instagramLogin() {}

  @UseGuards(InstagramAuthGuard)
  @Get('instagram/callback')
  async instagramCallback(
    @Query('state') state: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state });
  }

  @UseGuards(TwitterAuthGuard)
  @Get('twitter/login')
  twitterLogin() {}

  @UseGuards(TwitterAuthGuard)
  @Get('twitter/callback')
  async twitterCallback(
    @Query('state') state: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state });
  }

  @UseGuards(LinkedInAuthGuard)
  @Get('linkedin/login')
  linkedInLogin() {}

  @UseGuards(LinkedInAuthGuard)
  @Get('linkedin/callback')
  async linkedInCallback(
    @Query('state') state: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state });
  }

  @UseGuards(GithubAuthGuard)
  @Get('github/login')
  githubLogin() {}

  @UseGuards(GithubAuthGuard)
  @Get('github/callback')
  async githubCallback(
    @Query('state') state: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state });
  }

  @UseGuards(TelepassAuthGuard)
  @Get('telegram/login')
  // TELEGRAM via TELEPASS
  telegramLogin() {}

  @UseGuards(TelepassAuthGuard)
  @Get('telegram/callback')
  async telegramCallback(
    @Query('state') state: string,
    @Request() req: AuthRequest,
    @Response() res: ExpressResponse,
  ) {
    await this._handleOAuthRedirect({ req, res, state });
  }

  async _handleOAuthRedirect({
    req,
    res,
    state,
  }: {
    req: AuthRequest;
    res: ExpressResponse;
    state: string;
  }) {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );
    const redirectUrl = this.authService.buildRedirectUrl(state, accessToken);
    this.authService.attachRefreshTokenToCookie(res, refreshToken);

    res.redirect(redirectUrl);
  }
}
