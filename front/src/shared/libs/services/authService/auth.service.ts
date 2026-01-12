import { HttpService } from '../httpService/http.service.ts';
import type { IAuthResponse } from '@/entities/AuthUser';
import { API_BASE } from '@/shared/constants';

const AUTH_PATH = '/api/auth';
export class AuthService {
  constructor(private readonly http: HttpService) {}

  async registerByPassword({ email, password, name }: { email: string, password: string, name: string }): Promise<IAuthResponse> {
    return await this.http.request(`${AUTH_PATH}/register`, {
      method: 'POST',
      body: { email, password, name },
    },)
  }

  async loginByPassword({ email, password }: { email: string, password: string }): Promise<IAuthResponse> {
    return await this.http.request(`${AUTH_PATH}/login`, {
      method: 'POST',
      body: { email, password },
    },)
  }

  async logout(): Promise<void> {
    await this.http.request(`${AUTH_PATH}/logout`)
  }

  async refreshToken(): Promise<{ token: string }> {
    return await this.http.request(`${AUTH_PATH}/refresh`, { credentials: 'include' })
  }

  async loginWithGoogle() {
    window.location.href = `${API_BASE}${AUTH_PATH}/google/login`
  }

  async loginWithFacebook() {
    window.location.href = `${API_BASE}${AUTH_PATH}/facebook/login`
  }

  async loginWithTwitter() {
    window.location.href = `${API_BASE}${AUTH_PATH}/twitter/login`
  }

  async loginWithLinkedin(){
    window.location.href = `${API_BASE}${AUTH_PATH}/linkedin/login`
  }

  async loginWithInstagram() {
    window.location.href = `${API_BASE}${AUTH_PATH}/instagram/login`
  }

  async loginWithGithub() {
    window.location.href = `${API_BASE}${AUTH_PATH}/github/login`
  }

  async loginWithTelegram(){
    window.location.href = `${API_BASE}${AUTH_PATH}/telegram/login`
  }
}