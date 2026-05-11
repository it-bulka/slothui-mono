import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, MoreThan, LessThan } from 'typeorm';
import { EmailVerificationToken } from './entity/email-verification.entity';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { addMinutes } from '../common/utils/addMinutes';
import { Cron } from '@nestjs/schedule';

const TOKEN_TTL_HOURS = 24;

@Injectable()
export class EmailVerificationService {
  constructor(
    @InjectRepository(EmailVerificationToken)
    private readonly repo: Repository<EmailVerificationToken>,
  ) {}

  async createVerificationToken(userId: string): Promise<string> {
    await this.repo.delete({ user: { id: userId } });

    const token = randomUUID();
    const tokenHash = await bcrypt.hash(token, 10);

    const entity = this.repo.create({
      user: { id: userId },
      tokenHash,
      expiresAt: addMinutes(new Date(), TOKEN_TTL_HOURS * 60),
    });

    await this.repo.save(entity);

    return token;
  }

  async validateVerificationToken(
    rawToken: string,
  ): Promise<EmailVerificationToken | null> {
    const records = await this.repo.find({
      where: {
        usedAt: IsNull(),
        expiresAt: MoreThan(new Date()),
      },
      relations: ['user'],
    });

    for (const record of records) {
      const match = await bcrypt.compare(rawToken, record.tokenHash);
      if (match) return record;
    }

    return null;
  }

  async markTokenUsed(id: string): Promise<void> {
    await this.repo.update(id, { usedAt: new Date() });
  }

  @Cron('0 0 * * *')
  async deleteExpiredTokens(): Promise<void> {
    await this.repo.delete({ expiresAt: LessThan(new Date()) });
  }
}
