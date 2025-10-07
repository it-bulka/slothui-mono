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
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from '../common/types/user.types';
import { UserMapper } from '../user/user-mapper';
import { Response as ExpressResponse } from 'express';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async registerByLogin(
    @Body() createUserDto: CreateUserDto,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    const user = await this.userService.create(createUserDto);

    const { accessToken, refreshToken } = await this.authService.login({
      id: user.id,
      role: user.role,
    });
    this.authService.attachRefreshTokenToCookie(res, refreshToken);

    return { user: UserMapper.toResponse(user), accessToken };
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Request() req: AuthRequest,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );
    this.authService.attachRefreshTokenToCookie(res, refreshToken);

    return { user: UserMapper.toResponse(req.user), token: accessToken };
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
  @Get('logout')
  async logout(@Request() req: AuthRequest) {
    await this.authService.logout(req.user.id);
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
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );
    const redirectUrl = this.authService.buildRedirectUrl(state, accessToken);
    this.authService.attachRefreshTokenToCookie(res, refreshToken);

    res.redirect(redirectUrl);
  }
}
