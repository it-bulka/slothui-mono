import { combineReducers } from '@reduxjs/toolkit';
import type { AnyAction } from '@reduxjs/toolkit';
import { analyticsReducer } from '@/entities/ProfileAnalytics';
import { authUserReducer, deleteProfileThunk } from '@/entities/AuthUser';
import { chatsReducer } from '@/entities/Chats/model/slice';
import { commentsReducer } from '@/entities/Comment/model';
import { currentChatReducer } from '@/entities/CurrentChat';
import { eventsReducer } from '@/entities/Event/model';
import { friendsReducer } from '@/entities/Friends';
import { messageReducer } from '@/entities/Message/model';
import { notificationsCountersReducer } from '@/entities/NotificationsCounters';
import { postsReducer } from '@/entities/Post';
import { replyTargetReducer } from '@/entities/ReplyTarget';
import { storiesReducer } from '@/entities/Story/model';
import { usersProfilesReducer } from '@/entities/UsersProfiles/model';
import { usersSuggestionsReducer } from '@/entities/UsersSugestions';
import { postComposerReducer } from '@/features/PostComposer';
import { pollDetailsReducer } from '@/entities/Poll';
import { notificationsReducer } from '@/entities/Notification';
import { contactsReducer } from '@/entities/Contacts';

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
  pollDetails: pollDetailsReducer,
  notifications: notificationsReducer,
  contacts: contactsReducer,
});

export const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {
  if (action.type === 'logout/rejected' || action.type === 'logout/fulfilled' || deleteProfileThunk.fulfilled.match(action)) {
    // state = undefined → all slice come back to initialState
    state = undefined;
  }

  return appReducer(state, action);
};