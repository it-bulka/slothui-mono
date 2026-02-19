import { configureStore } from '@reduxjs/toolkit';
import { getServices } from '@/shared/libs/services';
import { authUserActions } from '@/entities';
import { deleteTokenToLocalStorage, ErrorHelper } from '@/shared/libs';
import { rootReducer } from './appReducer.ts';

const services = getServices();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          services: services,
          updateToken: (t:string | null) => {
            services.tokenManager.setToken(t)
          },
          extractErrorMessage: ErrorHelper.extractErrorMessage
        },
      },
    }),
})

services.http.setOnUnauthorized(() => {
  store.dispatch(authUserActions.logoutLocal());
  deleteTokenToLocalStorage()
});