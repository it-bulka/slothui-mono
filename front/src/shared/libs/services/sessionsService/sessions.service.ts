import { HttpService } from '../httpService/http.service.ts';
import type { UserSessionDto } from '../../../types';

export class SessionsService {
  private BASE_URL = '/api/sessions';
  constructor(
    private readonly http: HttpService,
  ) {}

  /** POST /api/polls/:id/choose-answer */
  async getAllSessions(): Promise<UserSessionDto[]> {
    return await this.http.request<UserSessionDto[]>(this.BASE_URL, { credentials: 'include' });
  }

  /** DELETE /api/sessions/:id */
  async deleteSession(sessionId: string): Promise<void> {
    return await this.http.request<void>(
      `${this.BASE_URL}/${sessionId}`,
      { method: 'DELETE' },
    );
  }

  /** DELETE /api/sessions/others -> delete other except current*/
  async deleteOtherSessions(): Promise<void> {
    return await this.http.request<void>(
      `${this.BASE_URL}/others`,
      { method: 'DELETE' },
    );
  }
}