import { HttpService } from '../httpService/http.service.ts';
import { API_BASE } from '@/shared/constants';
import type { RegisterUserArgs, IAuthResponse } from '../../../types/auth.types.ts';

const AUTH_PATH = '/api/auth';
export class AuthService {
  constructor(private readonly http: HttpService) {}

  async registerByPassword({
    email,
    password,
    name,
    nickname,
    avatar, // FileList | undefined
  }: RegisterUserArgs): Promise<Pick<IAuthResponse, 'token' | 'user'>> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('nickname', nickname);

    if (avatar && avatar.length > 0) {
      formData.append('avatar', avatar[0]);
    }
    return await this.http.request(`${AUTH_PATH}/register`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    },)
  }

  async loginByPassword({ email, password }: { email: string, password: string }): Promise<IAuthResponse> {
    return await this.http.request(`${AUTH_PATH}/login`, {
      method: 'POST',
      body: { email, password },
      credentials: 'include'
    })
  }

  logout = async (): Promise<void> => {
    await this.http.request(`${AUTH_PATH}/logout`, { credentials: 'include' });
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