import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailer: MailerService) {}

  async sendVerificationEmail(email: string, link: string) {
    try {
      await this.mailer.sendMail({
        to: email,
        subject: 'Verify your email',
        template: 'verify-email',
        context: { link },
      });
    } catch (err) {
      this.logger.error(`Failed to send verification email to ${email}`, err);
      throw err;
    }
  }

  async sendResetPassword(email: string, link: string) {
    try {
      await this.mailer.sendMail({
        to: email,
        subject: 'Reset your password',
        template: 'reset-password',
        context: {
          link,
        },
      });
    } catch (err) {
      this.logger.error(`Failed to send reset email to ${email}`, err);
      throw err;
    }
  }
}
