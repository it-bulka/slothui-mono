import { Notification } from '../entities/notification.entity';
import { NotificationResponseDto } from '../dto/notification-response.dto';

export function mapToNotificationDto(n: Notification): NotificationResponseDto {
  return {
    id: n.id,
    type: n.type,
    createdAt: n.createdAt,
    read: n.read,
    actor: n.actor
      ? {
          id: n.actor.id,
          username: n.actor.username,
          nickname: n.actor.nickname,
          avatarUrl: n.actor.avatarUrl,
        }
      : undefined,
    entityId: n.entityId ?? undefined,
    entityTitle: n.entityTitle ?? undefined,
    meta: n.meta ?? undefined,
  };
}
