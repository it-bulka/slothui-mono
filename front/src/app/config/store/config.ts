import { configureStore } from '@reduxjs/toolkit';
import { createServices } from '@/shared/libs/services';
import { currentChatReducer, chatsReducer, usersSuggestionsReducer, userReducer } from '@/entities';
import { ErrorHelper } from '@/shared/libs';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';

const services = createServices();

export const store = configureStore({
  reducer: {
    currentChat: currentChatReducer,
    chat: chatsReducer,
    user: userReducer,
    usersSuggestions: usersSuggestionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          services: services,
          updateToken: (t:string) => {
            services.http.updateToken(t)
            services.socket.updateToken(t)
          },
          extractErrorMessage: ErrorHelper.extractErrorMessage
        },
      },
    }),
})


export type RootState = ReturnType<typeof store.getState>;
export type ThunkExtra = {
  services: ReturnType<typeof createServices>
  updateToken: (t: string) => void
  extractErrorMessage: typeof ErrorHelper.extractErrorMessage;
};
export type ThunkAPI = {
  extra: ThunkExtra;
  rejectValue: string;
}
export type AppDispatch = ThunkDispatch<RootState, ThunkExtra, AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;