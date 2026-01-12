import { HttpService } from '../httpService/http.service.ts';
import type { NotificationsCountersDto } from './NotificationsCounters.types.ts';

export class NotificationsCountersService {
  private BASE_URL = '/api/notifications';
  constructor(
    private readonly http: HttpService,
  ) {}

  /** GET /api/notifications */
  async getCounters(): Promise<NotificationsCountersDto> {
    return await this.http.request<NotificationsCountersDto>(
      this.BASE_URL + '/stats?period=month',
    );
  }


}