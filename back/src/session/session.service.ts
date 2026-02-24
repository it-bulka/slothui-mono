import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserSession } from './entity/userSession.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { UserSessionDto } from './dto/user-sessions.dto';
import { DeepPartial } from 'typeorm';
import { parseUserAgentForSession } from './utils/parseUserAgentForSession';
import { formatLocationFromIP } from './utils/formatLocationFromIP';
import { createFingerprint } from './utils/createFingerprint';
import { getSessionExpireAt } from './utils/getSessionExpireAt';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(UserSession)
    private sessionRepo: Repository<UserSession>,
  ) {}

  async createSession({
    userId,
    refreshToken,
    ip,
    userAgent,
    deviceId,
  }: {
    userId: string;
    refreshToken: string;
    ip: string;
    userAgent: string;
    deviceId: string;
  }) {
    const fingerprint = createFingerprint(deviceId, userAgent);
    const location = formatLocationFromIP(ip);
    const { device, os, browser } = parseUserAgentForSession(userAgent);

    const data: DeepPartial<UserSession> = {
      user: { id: userId },
      hashedRefreshToken: await argon2.hash(refreshToken),
      ip,
      fingerprint,
      userAgent,
      device,
      os,
      browser,
      location,
      isActive: true,
      expiresAt: getSessionExpireAt(),
    };
    const session = this.sessionRepo.create(data);
    return this.sessionRepo.save(session);
  }

  async ensureSession({
    userAgent,
    userId,
    deviceId,
    ip,
    refreshToken,
  }: {
    userId: string;
    deviceId: string;
    userAgent: string;
    ip: string;
    refreshToken: string;
  }) {
    const fingerprint = createFingerprint(deviceId, userAgent);

    const existing = await this.getSessionByFingerprint(userId, fingerprint);
    if (existing) return existing;

    return this.createSession({
      userId,
      refreshToken,
      ip,
      userAgent,
      deviceId,
    });
  }

  async rotateRefreshToken(
    userId: string,
    oldRawRefreshToken: string,
    newRawRefreshToken: string,
  ): Promise<void> {
    const session = await this.getSessionByRefreshToken(
      userId,
      oldRawRefreshToken,
    );

    session.hashedRefreshToken = await argon2.hash(newRawRefreshToken);
    session.lastUsedAt = new Date(Date.now());
    session.expiresAt = getSessionExpireAt();
    await this.sessionRepo.save(session);
  }

  async getSessionByRefreshToken(userId: string, rawRefreshToken: string) {
    const sessions = await this.sessionRepo.find({
      where: { user: { id: userId }, isActive: true },
    });

    for (const session of sessions) {
      const isMatch =
        session.hashedRefreshToken &&
        (await argon2.verify(session.hashedRefreshToken, rawRefreshToken));

      if (isMatch) return session;
    }

    throw new NotFoundException('Session not found');
  }

  async invalidateSession(userId: string, rawRefreshToken: string) {
    const session = await this.getSessionByRefreshToken(
      userId,
      rawRefreshToken,
    );

    session.isActive = false;
    session.hashedRefreshToken = null;
    await this.sessionRepo.save(session);
  }

  async invalidateSessionById(userId: string, sessionId: string) {
    const session = await this.sessionRepo.findOne({
      where: { user: { id: userId }, id: sessionId },
    });

    if (!session) throw new NotFoundException('Session not found');
    if (!session.isActive)
      throw new BadRequestException('Session already deactivated');

    session.isActive = false;
    session.hashedRefreshToken = null;
    await this.sessionRepo.save(session);
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

  async getUserSessions(
    userId: string,
    currentRefreshToken?: string,
  ): Promise<UserSessionDto[]> {
    const sessions = await this.sessionRepo.find({
      where: { user: { id: userId }, isActive: true },
      order: { createdAt: 'DESC' },
    });

    return await Promise.all(
      sessions.map(async (s) => {
        let isCurrent = false;

        if (currentRefreshToken && s.hashedRefreshToken) {
          try {
            isCurrent = await argon2.verify(
              s.hashedRefreshToken,
              currentRefreshToken,
            );
          } catch {
            // ignore incorrect token
            isCurrent = false;
          }
        }

        return {
          id: s.id,
          userAgent: s.userAgent,
          ip: s.ip,
          device: s.device,
          os: s.os,
          browser: s.browser,
          location: s.location,
          isCurrent,
        };
      }),
    );
  }

  async getSessionByFingerprint(userId: string, fingerprint: string) {
    return await this.sessionRepo.findOne({
      where: { user: { id: userId }, fingerprint, isActive: true },
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
        (await argon2.verify(session.hashedRefreshToken, token));

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
