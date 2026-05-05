import { Injectable } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import type { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsFacadeService {
  constructor(private readonly notifications: NotificationsService) {}

  notify(dto: Omit<CreateNotificationDto, 'meta'>): void {
    if (dto.recipientId === dto.actorId) return;
    this.notifications.create(dto).catch(() => {});
  }
}
