import { useEffect } from 'react';
import { useAppDispatch } from '@/shared/config/redux';
import { initAuthUser, authUserActions } from '@/entities';
import { LOCAL_STORAGE_TOKEN_KEY } from '@/shared/constants';

export const InitBootstrap = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) {
      dispatch(initAuthUser());
    } else {
      dispatch(authUserActions.setInitialized());
    }
  }, [dispatch]);

  return null;
};
