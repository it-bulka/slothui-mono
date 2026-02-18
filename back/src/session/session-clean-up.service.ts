import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SessionService } from './session.service';

@Injectable()
export class SessionCleanUpService {
  constructor(private readonly sessionService: SessionService) {}
  @Cron('0 0 * * *')
  async handleCleanSession() {
    await this.sessionService.removeExpiredSessions();
  }
}
