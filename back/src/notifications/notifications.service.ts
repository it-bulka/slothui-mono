import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { mapToNotificationDto } from './utils/mapToNotificationDto';
import { checkNextCursor } from '../common/utils/checkNextCursor';
import { PaginatedResponse } from '../common/types/pagination.type';
import { EventEmitterNotificationService } from '../event-emitter/event-emitter-notification.service';
import { RedisService } from '../redis/redis.service';
import { CACHE_KEYS } from '../redis/redis.cache-keys';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly repo: Repository<Notification>,
    private readonly eventEmitter: EventEmitterNotificationService,
    private readonly cache: RedisService,
  ) {}

  async create(dto: CreateNotificationDto): Promise<Notification> {
    await this.repo.save({
      recipient: { id: dto.recipientId },
      actor: dto.actorId ? { id: dto.actorId } : null,
      type: dto.type,
      entityId: dto.entityId ?? null,
      entityTitle: dto.entityTitle ?? null,
      meta: dto.meta ?? null,
    });

    const saved = await this.repo
      .createQueryBuilder('n')
      .leftJoinAndSelect('n.actor', 'actor')
      .where('n.recipientId = :recipientId', { recipientId: dto.recipientId })
      .orderBy('n.createdAt', 'DESC')
      .limit(1)
      .getOne();

    if (saved) {
      this.eventEmitter.emitNewNotification(
        dto.recipientId,
        mapToNotificationDto(saved),
      );
      await this.cache.del(CACHE_KEYS.notifUnread(dto.recipientId));
    }

    return saved!;
  }

  async getList(
    userId: string,
    cursor?: string,
    limit = 20,
  ): Promise<PaginatedResponse<NotificationResponseDto>> {
    const qb = this.repo
      .createQueryBuilder('n')
      .leftJoinAndSelect('n.actor', 'actor')
      .where('n.recipientId = :userId', { userId })
      .orderBy('n.createdAt', 'DESC')
      .take(limit + 1);

    if (cursor) {
      qb.andWhere('n.createdAt < :cursor', { cursor });
    }

    const items = await qb.getMany();
    const { resultItems, nextCursor, hasMore } = checkNextCursor({
      items,
      cursorField: 'createdAt',
      limit,
    });

    return {
      items: resultItems.map(mapToNotificationDto),
      nextCursor,
      hasMore,
    };
  }

  async getUnreadCount(userId: string): Promise<{ count: number }> {
    const key = CACHE_KEYS.notifUnread(userId);
    const cached = await this.cache.get<{ count: number }>(key);
    if (cached) return cached;

    const count = await this.repo.count({
      where: { recipient: { id: userId }, read: false },
    });
    const result = { count };
    await this.cache.set(key, result, 60);
    return result;
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.repo.update(
      { recipient: { id: userId }, read: false },
      { read: true },
    );
    await this.cache.del(CACHE_KEYS.notifUnread(userId));
  }

  async markOneAsRead(id: string, userId: string): Promise<void> {
    await this.repo.update({ id, recipient: { id: userId } }, { read: true });
    await this.cache.del(CACHE_KEYS.notifUnread(userId));
  }
}
