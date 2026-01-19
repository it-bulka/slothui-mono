import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/constants';

export const deleteTokenToLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
}