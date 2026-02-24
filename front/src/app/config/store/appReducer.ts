import { combineReducers } from '@reduxjs/toolkit';
import type { AnyAction } from '@reduxjs/toolkit';
import {
  analyticsReducer,
  authUserReducer,
  chatsReducer,
  commentsReducer,
  currentChatReducer, eventsReducer, friendsReducer,
  messageReducer, notificationsCountersReducer, postsReducer, replyTargetReducer, storiesReducer, usersProfilesReducer,
  usersSuggestionsReducer,
  deleteProfileThunk
} from '@/entities';
import { postComposerReducer } from '@/features/PostComposer';

export const appReducer = combineReducers({
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
});

export const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
  if (action.type === 'logout/rejected' || action.type === 'logout/fulfilled' || deleteProfileThunk.fulfilled.match(action)) {
    // state = undefined → all slice come back to initialState
    state = undefined;
  }

  return appReducer(state, action);
};