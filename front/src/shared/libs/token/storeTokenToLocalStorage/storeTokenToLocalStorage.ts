import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/constants';

export const storeTokenToLocalStorage = (token: string | null) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token || '');
}