import { configureStore } from '@reduxjs/toolkit';
import { createServices } from '@/shared/libs/services';
import {
  currentChatReducer,
  chatsReducer,
  usersSuggestionsReducer,
  userReducer,
  messageReducer,
  commentsReducer,
  postsReducer,
  replyTargetReducer,
  friendsReducer,
  storiesReducer,
  eventsReducer
} from '@/entities';
import { ErrorHelper } from '@/shared/libs';

const services = createServices();

export const store = configureStore({
  reducer: {
    currentChat: currentChatReducer,
    chats: chatsReducer,
    user: userReducer,
    usersSuggestions: usersSuggestionsReducer,
    messages: messageReducer,
    comments: commentsReducer,
    posts: postsReducer,
    replyTarget: replyTargetReducer,
    friends: friendsReducer,
    stories: storiesReducer,
    events: eventsReducer
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