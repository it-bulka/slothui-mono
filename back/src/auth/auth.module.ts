import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import jwtConfig from './config/jwt.config';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleConfig } from './config/google.config';

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
    UserService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    GoogleConfig,
    RefreshJwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
