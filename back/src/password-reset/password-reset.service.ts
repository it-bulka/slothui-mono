import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, MoreThan, LessThan } from 'typeorm';
import { PasswordResetToken } from './entity/password-reset.entity';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { addMinutes } from '../common/utils/addMinutes';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(PasswordResetToken)
    private readonly resetRepo: Repository<PasswordResetToken>,
  ) {}

  async createResetToken(userId: string, ip?: string, userAgent?: string) {
    // delete old tokens
    await this.resetRepo.delete({ user: { id: userId } });

    const token = randomUUID();
    const tokenHash = await bcrypt.hash(token, 10);

    const entity = this.resetRepo.create({
      user: { id: userId },
      tokenHash,
      expiresAt: addMinutes(new Date(), 15),
      ip,
      userAgent,
    });

    await this.resetRepo.save(entity);

    return token; // raw token only for email
  }

  async validateResetToken(rawToken: string) {
    const records = await this.resetRepo.find({
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

  async markTokenUsed(id: string) {
    await this.resetRepo.update(id, { usedAt: new Date() });
  }

  /**
   * CLEAN EXPIRED TOKENS (cron)
   * */
  async deleteExpiredTokens() {
    await this.resetRepo.delete({
      expiresAt: LessThan(new Date()),
    });
  }
}
