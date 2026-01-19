import { useAppDispatch } from '@/shared/config/redux';
import { logout as logoutThunk } from '../../logout/logout.thunk.ts';
import { useCallback } from 'react';

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    dispatch(logoutThunk());
  }, [dispatch]);

  return { logout };
}