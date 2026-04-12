export interface CreateNotificationDto {
  recipientId: string;
  actorId?: string;
  type: 'like' | 'follow' | 'comment' | 'system';
  entityId?: string;
  entityTitle?: string;
  meta?: Record<string, unknown>;
}
