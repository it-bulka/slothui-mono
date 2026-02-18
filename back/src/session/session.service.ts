import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSession } from './entity/userSession.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(UserSession)
    private sessionRepo: Repository<UserSession>,
  ) {}

  async createSession(
    userId: string,
    refreshToken: string,
    ip: string,
    userAgent: string,
  ) {
    const session = this.sessionRepo.create({
      user: { id: userId },
      hashedRefreshToken: await argon2.hash(refreshToken),
      ip,
      userAgent,
      isActive: true,
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    });
    return this.sessionRepo.save(session);
  }

  async invalidateSession(userId: string, rawRefreshToken: string) {
    const sessions = await this.sessionRepo.find({
      where: { user: { id: userId }, isActive: true },
    });

    for (const session of sessions) {
      const isMatch =
        session.hashedRefreshToken &&
        (await argon2.verify(session.hashedRefreshToken, rawRefreshToken));

      if (isMatch) {
        session.isActive = false;
        session.hashedRefreshToken = null;
        await this.sessionRepo.save(session);
        return;
      }
    }

    throw new NotFoundException('Session not found');
  }

  async invalidateOtherUserSessions(
    userId: string,
    currentRawRefreshToken: string,
  ) {
    const sessions = await this.sessionRepo.find({
      where: { user: { id: userId }, isActive: true },
    });

    for (const session of sessions) {
      if (!session.hashedRefreshToken) continue;

      const isCurrent = await argon2.verify(
        session.hashedRefreshToken,
        currentRawRefreshToken,
      );
      if (isCurrent) continue;

      // inactivate other sessions
      session.isActive = false;
      session.hashedRefreshToken = null;
      await this.sessionRepo.save(session);
    }
  }

  async getUserSessions(userId: string) {
    return this.sessionRepo.find({
      where: { user: { id: userId }, isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async validateRefreshToken(userId: string, token: string) {
    const sessions = await this.sessionRepo.find({
      where: { user: { id: userId }, isActive: true },
      relations: ['user'],
      select: {
        user: { id: true, email: true, username: true, role: true },
      },
    });

    for (const session of sessions) {
      const isMatch =
        !!session.hashedRefreshToken &&
        (await argon2.verify(token, session.hashedRefreshToken));

      if (isMatch) return session;
    }

    return null;
  }

  async removeExpiredSessions() {
    const now = new Date();
    await this.sessionRepo
      .createQueryBuilder()
      .update(UserSession)
      .set({ isActive: false, hashedRefreshToken: null })
      .where('expiresAt <= :now', { now })
      .execute();
  }

  async deleteExpiredSessions() {
    await this.sessionRepo
      .createQueryBuilder()
      .delete()
      .from(UserSession)
      .where('expiresAt <= :now', { now: new Date() })
      .andWhere('isActive = false')
      .execute();
  }
}
