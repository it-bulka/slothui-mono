import { HttpService } from '../httpService/http.service.ts';
import { Subject, type Observable } from 'rxjs';
import type { Socket } from 'socket.io-client';
import { SocketService } from '../socketService/socket.service.ts';
import type { UserDTO } from '@/shared/types/chat.types.ts';
import type {
  PaginatedResponse,
  ProfileAnalyticsDto,
  UserShort,
  OtherUserWithStats, UpdateUserDto, IAuthResponse
} from '../../../types';
import type {
  UserContact,
  CreateContactDto,
  UpdateContactDto as UpdateContactDtoType,
  SaveContactItem,
} from '@/shared/types/contacts.types';

const USERS_API = '/api/users';
export class UserService {
  private socket: Socket | undefined;
  private readonly contactsUpdated$ = new Subject<UserContact[]>();

  constructor(
    private readonly http: HttpService,
    wsService: SocketService,
  ) {
    wsService.onConnected(() => {
      this.socket = wsService.socket;
      this.registerSocketEvents();

      wsService.$reconnected.subscribe(() => {
        this.socket = wsService.socket;
        this.offSocketEvents();
        this.registerSocketEvents();
      });
    });
  }

  private registerSocketEvents() {
    this.socket!.on('contacts:updated', (data: UserContact[]) =>
      this.contactsUpdated$.next(data),
    );
  }

  private offSocketEvents() {
    this.socket?.off('contacts:updated');
  }

  onContactsUpdated(): Observable<UserContact[]> {
    return this.contactsUpdated$.asObservable();
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

    /** PATCH /api/users/me/profile  -> update current user profile data */
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
      `${USERS_API}/me/profile`,
      {
        method: 'PATCH',
        body: fd,
      },
    );
  }

  async deleteProfile(): Promise<void> {
    await this.http.request<UserShort>(
      `${USERS_API}/me/profile`,
      {
        method: 'DELETE',
        credentials: 'include'
      },
    );
  }

  /** GET /api/users/profile-analytics */
  async getAnalytics(): Promise<ProfileAnalyticsDto> {
    return await this.http.request<ProfileAnalyticsDto>(
      `${USERS_API}/profile-analytics`,
    );
  }

  /** GET /api/users/:userId/contacts */
  async getContacts(userId: string): Promise<UserContact[]> {
    return await this.http.request<UserContact[]>(`${USERS_API}/${userId}/contacts`);
  }

  /** POST /api/users/me/contacts */
  async createContact(dto: CreateContactDto): Promise<UserContact> {
    return await this.http.request<UserContact>(`${USERS_API}/me/contacts`, {
      method: 'POST',
      body: dto,
    });
  }

  /** PATCH /api/users/me/contacts/:id */
  async updateContact(id: string, dto: UpdateContactDtoType): Promise<UserContact> {
    return await this.http.request<UserContact>(`${USERS_API}/me/contacts/${id}`, {
      method: 'PATCH',
      body: dto,
    });
  }

  /** DELETE /api/users/me/contacts/:id */
  async deleteContact(id: string): Promise<void> {
    await this.http.request<void>(`${USERS_API}/me/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  /** POST /api/users/me/contacts — replace-all array */
  async saveContacts(items: SaveContactItem[]): Promise<UserContact[]> {
    return this.http.request<UserContact[]>(`${USERS_API}/me/contacts`, {
      method: 'POST',
      body: items,
    });
  }
}