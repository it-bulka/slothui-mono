import { configureStore } from '@reduxjs/toolkit';
import { createServices } from '@/shared/libs/services';
import { currentChatReducer, chatsReducer, usersSuggestionsReducer, userReducer, messageReducer } from '@/entities';
import { ErrorHelper } from '@/shared/libs';

const services = createServices();

export const store = configureStore({
  reducer: {
    currentChat: currentChatReducer,
    chat: chatsReducer,
    user: userReducer,
    usersSuggestions: usersSuggestionsReducer,
    messages: messageReducer
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


export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>;