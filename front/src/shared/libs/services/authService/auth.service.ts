import { HttpService } from '../httpService/http.service.ts';
import { API_BASE } from '@/shared/constants';
import type { RegisterUserArgs, IAuthResponse } from '../../../types/auth.types.ts';
import { getDeviceId } from '../../../libs';

const AUTH_PATH = '/api/auth';
export class AuthService {
  private deviceId = getDeviceId();
  constructor(private readonly http: HttpService) {}

  async registerByPassword({
    email,
    password,
    username,
    nickname,
    avatar, // FileList | undefined
  }: RegisterUserArgs): Promise<IAuthResponse> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('username', username);
    formData.append('nickname', nickname);

    if (avatar && avatar.length > 0) {
      formData.append('avatar', avatar[0]);
    }
    formData.append('deviceId', this.deviceId);
    return await this.http.request(`${AUTH_PATH}/register`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    },)
  }

  async loginByPassword({ email, password }: { email: string, password: string }): Promise<IAuthResponse> {
    return await this.http.request(`${AUTH_PATH}/login`, {
      method: 'POST',
      body: { email, password, deviceId: this.deviceId },
      credentials: 'include'
    })
  }

  logout = async (): Promise<void> => {
    await this.http.request(`${AUTH_PATH}/logout`, { credentials: 'include' });
  }

  async loginWithGoogle() {
    window.location.href = `${API_BASE}${AUTH_PATH}/google/login?deviceId=${this.deviceId}`;
  }

  async loginWithFacebook() {
    window.location.href = `${API_BASE}${AUTH_PATH}/facebook/login?deviceId=${this.deviceId}`
  }

  async loginWithTwitter() {
    window.location.href = `${API_BASE}${AUTH_PATH}/twitter/login?deviceId=${this.deviceId}`
  }

  async loginWithLinkedin(){
    window.location.href = `${API_BASE}${AUTH_PATH}/linkedin/login?deviceId=${this.deviceId}`
  }

  async loginWithInstagram() {
    window.location.href = `${API_BASE}${AUTH_PATH}/instagram/login?deviceId=${this.deviceId}`
  }

  async loginWithGithub() {
    window.location.href = `${API_BASE}${AUTH_PATH}/github/login?deviceId=${this.deviceId}`
  }

  async loginWithTelegram(){
    window.location.href = `${API_BASE}${AUTH_PATH}/telegram/login?deviceId=${this.deviceId}`
  }

  async forgotPassword({ email }: { email: string }) {
    return await this.http.request(`${AUTH_PATH}/forgot-password`, {
      method: 'POST',
      body: { email },
      credentials: 'include'
    })
  }

  async resetPassword({ password, token }: { password: string, token: string }) {
    return await this.http.request(`${AUTH_PATH}/reset-password`, {
      method: 'POST',
      body: { password, token },
      credentials: 'include'
    })
  }
}