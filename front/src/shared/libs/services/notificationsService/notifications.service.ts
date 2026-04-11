import type { HttpService } from '../httpService/http.service';
import type { PaginatedResponse } from '@/shared/types';
import type { Notification } from '@/entities/Notification/model/type/notification.types.ts';

export class NotificationsService {
  private BASE_URL = '/api/notifications';

  constructor(private readonly http: HttpService) {}

  /** GET /api/notifications */
  async getList(params?: {
    cursor?: string | null;
    limit?: number;
  }): Promise<PaginatedResponse<Notification>> {
    return this.http.request<PaginatedResponse<Notification>>(
      this.BASE_URL,
      { params }
    );
  }

  /** GET /api/notifications/unread-count */
  async getUnreadCount(): Promise<{ count: number }> {
    return this.http.request<{ count: number }>(
      `${this.BASE_URL}/unread-count`
    );
  }

  /** POST /api/notifications/mark-all-read */
  async markAllAsRead(): Promise<void> {
    return this.http.request(
      `${this.BASE_URL}/mark-all-read`,
      { method: 'POST' }
    );
  }

  /** POST /api/notifications/mark-read/:id */
  async markOneAsRead(id: string): Promise<void> {
    return this.http.request(
      `${this.BASE_URL}/${id}/read`,
      { method: 'POST' }
    );
  }
}