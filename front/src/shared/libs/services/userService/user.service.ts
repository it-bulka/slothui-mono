import { HttpService } from '../httpService/http.service.ts';
import type { UserDTO } from '@/shared/types/chat.types.ts';
import type {
  PaginatedResponse,
  ProfileAnalyticsDto,
  UserShort,
  OtherUserWithStats, UpdateUserDto, IAuthResponse
} from '../../../types';

const USERS_API = '/api/users';
export class UserService {
  constructor(private readonly http: HttpService) {}

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

  /** GET /api/users/me/profile  for current user */
  async getMyProfileData(): Promise<Omit<IAuthResponse, 'token'>> {
    return await this.http.request<Omit<IAuthResponse, 'token'>>(
      `${USERS_API}/me/profile`,
    );
  }

  /** POST /api/users/me/change-password */
  async changePassword(dto: {oldPassword: string, newPassword: string}): Promise<void> {
    return await this.http.request<void>(
      `${USERS_API}/me/change-password`,
      {
        body: { oldPassword: dto.oldPassword, newPassword: dto.newPassword }
      }
    );
  }

  /** GET /api/users/:id/profile  for users, except current */
  async getProfileData(id: string): Promise<OtherUserWithStats> {
    return await this.http.request<OtherUserWithStats>(
      `${USERS_API}/${id}/profile`,
    );
  }

    /** PATCH /api/users/me/profile/update  -> update current user profile data */
  async updateProfileData(data: UpdateUserDto): Promise<UserShort> {
    const keys = Object.keys(data);
    if (!keys.length) throw new Error('No data for updating');
    const fd = new FormData();

    if (data.username) fd.append('username', data.username);
    if (data.nickname) fd.append('nickname', data.nickname);
    if ('bio' in data)  fd.append('bio', data.bio ?? '');
    if (data.removeAvatar) fd.append('removeAvatar', String(data.removeAvatar));
    if (data.avatar) fd.append('avatar', data.avatar);

    return await this.http.request<UserShort>(
      `${USERS_API}/me/profile/update`,
      {
        method: 'PATCH',
        body: fd,
      },
    );
  }

  /** GET /api/users/profile-analytics */
  async getAnalytics(): Promise<ProfileAnalyticsDto> {
    return await this.http.request<ProfileAnalyticsDto>(
      `${USERS_API}/profile-analytics`,
    );
  }
}