import { HttpService } from '../httpService/http.service.ts';

const AUTH_PATH = '/api/auth';
export class AuthService {
  constructor(private readonly http: HttpService) {}

  async loginByPassword({ email, password, name }: { email: string, password: string, name: string }) {
    return await this.http.request(`${AUTH_PATH}/login`, {
      method: 'POST',
      body: { email, password, name },
    },)
  }

  async registerByPassword({ email, password }: { email: string, password: string }) {
    return await this.http.request(`${AUTH_PATH}/register`, {
      method: 'POST',
      body: { email, password },
    },)
  }

  async logout() {
    await this.http.request(`${AUTH_PATH}/logout`)
  }

  async refreshToken() {
    await this.http.request(`${AUTH_PATH}/refresh`, { credentials: 'include' })
  }
}