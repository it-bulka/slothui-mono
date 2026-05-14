import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAppDispatch } from '@/shared/config/redux';
import { initAuthUser, authUserActions, fetchNotificationsCountersThunk } from '@/entities';
import { TokenManager } from '@/shared/libs/services/tokenManager/TokenManager.ts';
import { getServices } from '@/shared/libs/services';

export const InitBootstrap = () => {
  const dispatch = useAppDispatch();
  const { pathname, search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const oauthToken = params.get('token');
    const isVerifyEmailPage = pathname === '/auth/verify-email';

    const run = async () => {
      if (oauthToken && !isVerifyEmailPage) {
        new TokenManager().setToken(oauthToken);
        window.history.replaceState({}, '', pathname);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return null;
};
