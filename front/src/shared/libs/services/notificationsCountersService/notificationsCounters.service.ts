import { HttpService } from '../httpService/http.service.ts';
import type { NotificationsCountersDto } from './NotificationsCounters.types.ts';

export class NotificationsCountersService {
  private BASE_URL = '/api/stats';
  constructor(
    private readonly http: HttpService,
  ) {}

  async getCounters(): Promise<NotificationsCountersDto> {
    return await this.http.request<NotificationsCountersDto>(
      this.BASE_URL + '/counters',
    );
  }


}