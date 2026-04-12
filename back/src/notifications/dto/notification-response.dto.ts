import { UserShortDTO } from '../../user/dto/user-response.dto';

export interface NotificationResponseDto {
  id: string;
  type: 'like' | 'follow' | 'comment' | 'system';
  createdAt: string;
  read: boolean;
  actor?: UserShortDTO;
  entityId?: string;
  entityTitle?: string;
  meta?: Record<string, unknown>;
}
