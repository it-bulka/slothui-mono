import { configureStore } from '@reduxjs/toolkit';
import { getServices } from '@/shared/libs/services';
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
  analyticsReducer,
  authUserActions
} from '@/entities';
import { postComposerReducer } from '@/features/PostComposer';
import { ErrorHelper } from '@/shared/libs';
import { deleteTokenToLocalStorage } from '@/shared/libs';

const services = getServices();

export const store = configureStore({
  reducer: {
    currentChat: currentChatReducer,
    chats: chatsReducer,
    authUser: authUserReducer,
    usersSuggestions: usersSuggestionsReducer,
    messages: messageReducer,
    comments: commentsReducer,
    posts: postsReducer,
    postComposer: postComposerReducer,
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