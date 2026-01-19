import { redirect } from 'react-router';
import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/constants';
import { getLoginPage } from '../../../config/routeConfig/routeConfig.tsx';

export const checkAuthLoader = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  if (!token) {
    throw redirect(getLoginPage());
  }

  return null;
}