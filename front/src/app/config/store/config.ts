import { configureStore } from '@reduxjs/toolkit';
import { getServices } from '@/shared/libs/services';
import { authUserActions } from '@/entities/AuthUser';
import { deleteTokenToLocalStorage } from '@/shared/libs/token/deleteTokenLocalStorage/deleteTokenLocalStorage';
import { ErrorHelper } from '@/shared/libs/errorHelper';
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