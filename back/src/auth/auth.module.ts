import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import jwtConfig from './config/jwt.config';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import {
  FacebookConfig,
  GoogleConfig,
  InstagramConfig,
  TwitterConfig,
  LinkedInConfig,
  GithubConfig,
  TelepassConfig,
} from './config';
import {
  FacebookStrategy,
  JwtStrategy,
  GoogleStrategy,
  RefreshJwtStrategy,
  LocalStrategy,
  InstagramStrategy,
  TwitterStrategy,
  LinkedInStrategy,
  GithubStrategy,
  TelegramStrategy,
} from './strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UserModule,
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // OAUTH CONFIGS
    GoogleConfig,
    FacebookConfig,
    InstagramConfig,
    TwitterConfig,
    LinkedInConfig,
    GithubConfig,
    TelepassConfig,
    // OAUTH STRATEGIES
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
    RefreshJwtStrategy,
    InstagramStrategy,
    TwitterStrategy,
    LinkedInStrategy,
    GithubStrategy,
    TelegramStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
