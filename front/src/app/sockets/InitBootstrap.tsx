import { useEffect } from 'react';
import { useAppDispatch } from '@/shared/config/redux';
import { initAuthUser, authUserActions, fetchNotificationsCountersThunk } from '@/entities';
import { TokenManager } from '@/shared/libs/services/tokenManager/TokenManager.ts';
import { getServices } from '@/shared/libs/services';

export const InitBootstrap = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oauthToken = params.get('token');

    const run = async () => {
      if (oauthToken) {
        new TokenManager().setToken(oauthToken);
        window.history.replaceState({}, '', window.location.pathname);
      }

      if (new TokenManager().getToken()) {
        await getServices().initFeatureServices();
        dispatch(initAuthUser());
        dispatch(fetchNotificationsCountersThunk());
      } else {
        dispatch(authUserActions.setInitialized());
      }
    };

    run();
  }, [dispatch]);

  return null;
};
