import { useAppDispatch } from '@/shared/config/redux';
import { logout as logoutThunk } from '../../logout/logout.thunk.ts';
import { authUserActions } from '../../slice.ts';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { getLoginPage } from '@/shared/config/routeConfig/routeConfig.tsx';

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
    } catch {
      // server logout failed — ignore, clean up client-side anyway
    } finally {
      dispatch(authUserActions.logoutLocal());
      navigate(getLoginPage(), { replace: true });
    }
  }, [dispatch, navigate]);

  return { logout };
}