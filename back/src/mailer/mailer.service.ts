import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailer: MailerService) {}

  async sendResetPassword(email: string, link: string) {
    await this.mailer.sendMail({
      to: email,
      subject: 'Reset your password',
      template: 'reset-password', // hbs
      context: {
        link,
      },
    });
  }
}
