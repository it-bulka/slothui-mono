import { configureStore } from '@reduxjs/toolkit';
import { createServices } from '@/shared/libs/services';
import {
  currentChatReducer,
  chatsReducer,
  usersSuggestionsReducer,
  authUserReducer,
  messageReducer,
  commentsReducer,
  postsReducer,
  replyTargetReducer,
  friendsReducer,
  storiesReducer,
  eventsReducer,
  notificationsCountersReducer,
  usersProfilesReducer,
  analyticsReducer
} from '@/entities';
import { ErrorHelper } from '@/shared/libs';

const services = createServices();

export const store = configureStore({
  reducer: {
    currentChat: currentChatReducer,
    chats: chatsReducer,
    authUser: authUserReducer,
    usersSuggestions: usersSuggestionsReducer,
    messages: messageReducer,
    comments: commentsReducer,
    posts: postsReducer,
    replyTarget: replyTargetReducer,
    friends: friendsReducer,
    stories: storiesReducer,
    events: eventsReducer,
    notificationsCounters: notificationsCountersReducer,
    usersProfiles: usersProfilesReducer,
    analytics: analyticsReducer,
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