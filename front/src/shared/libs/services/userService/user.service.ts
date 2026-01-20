import { HttpService } from '../httpService/http.service.ts';
import type { UserDTO } from '@/shared/types/chat.types.ts';
import type { PaginatedResponse, ProfileAnalyticsDto, UserProfileStatsDto, UserShort } from '../../../types';

const USERS_API = '/api/users';
export class UserService {
  constructor(private readonly http: HttpService) {}
  async updateUser(id: string, name: string, file?: File): Promise<UserDTO> {
    const fd = new FormData();
    fd.append('name', name);
    if (file) fd.append('avatar', file);

    return await this.http.request<UserDTO>(
      `${USERS_API}/${id}`,
      {
        method: 'PATCH',
        body: fd,
      },
    );
  }

  async listUsers(): Promise<UserDTO[]> {
    const res = await this.http.request<{ items: UserDTO[] }>(USERS_API);
    return res.items;
  }

  async searchUsers({
    search,
    cursor,
    limit = 50,
    signal
  }: { search: string, cursor?: string | null, limit?: number, signal?: AbortSignal }): Promise<PaginatedResponse<UserShort>> {
    return await this.http.request<PaginatedResponse<UserShort>>(
      USERS_API,
      {
        params: { search, cursor, limit },
        signal
      });
  }

  async deleteUser(id: string): Promise<void>{
    await this.http.request<{ items: UserDTO[] }>(
      `${USERS_API}/${id}`,
    );
  }

  /** GET /api/users/:id/profile-stats */
  async getProfileStats(id: string): Promise<UserProfileStatsDto> {
    return await this.http.request<UserProfileStatsDto>(
      `${USERS_API}/${id}/profile-stats`,
    );
  }

  /** GET /api/users/profile-analytics */
  async getAnalytics(): Promise<ProfileAnalyticsDto> {
    return await this.http.request<ProfileAnalyticsDto>(
      `${USERS_API}/profile-analytics`,
    );
  }
}