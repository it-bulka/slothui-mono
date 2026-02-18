import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PasswordResetService } from './password-reset.service';

@Injectable()
export class PasswordResetCleanupService {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Cron('0 0 * * *')
  async handleCleanup() {
    await this.passwordResetService.deleteExpiredTokens();
  }
}
