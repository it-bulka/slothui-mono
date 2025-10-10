import { HttpService } from '../httpService/http.service.ts';
import type { UserDTO } from '@/shared/types/chat.types.ts';

const USERS_API = 'api/users';
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

  async deleteUser(id: string): Promise<void>{
    await this.http.request<{ items: UserDTO[] }>(
      `${USERS_API}/${id}`,
    );
  }
}