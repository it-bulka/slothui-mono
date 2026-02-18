import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetCleanupService } from './password-reset-cleanup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetToken } from './entity/password-reset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordResetToken])],
  controllers: [],
  providers: [PasswordResetService, PasswordResetCleanupService],
  exports: [PasswordResetService],
})
export class PasswordResetModule {}
