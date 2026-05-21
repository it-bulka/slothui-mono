import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAppDispatch } from '@/shared/config/redux';
import { initAuthUser, authUserActions } from '@/entities/AuthUser';
import { fetchNotificationsCountersThunk } from '@/entities/NotificationsCounters';
import { TokenManager } from '@/shared/libs/services/tokenManager/TokenManager.ts';
import { getServices } from '@/shared/libs/services';

/**
 * Runs once on mount to bootstrap the authenticated session.
 *
 * Reads `search`/`pathname` from the initial URL at mount time only —
 * intentionally NOT in the deps array to avoid re-running on every navigation.
 * `dispatch` is stable and listed only to satisfy the linter for the thunk calls.
 */
export const InitBootstrap = () => {
  const dispatch = useAppDispatch();
  const { pathname, search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const oauthToken = params.get('token');
    const isVerifyEmailPage = pathname === '/auth/verify-email';

    const run = async () => {
      if (oauthToken && !isVerifyEmailPage) {
        // Backend appends ?token= after a successful OAuth redirect.
        // Store the token, then strip the query string from the URL bar
        // using the native History API — avoids triggering a React Router
        // navigation event that could cause re-renders or re-run effects.
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
  // deps: intentionally omitting `search` and `pathname` — this effect must run
  // only once on mount (app bootstrap), not on every navigation.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return null;
};
