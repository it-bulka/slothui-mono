import { eventsAdapter } from './event.adapter.ts';
import type { EventsState } from '../types/event.type.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  fetchSubscribedEventsExtraReducer,
  fetchEventsByUserExtraReducer,
  fetchAllEventsExtraReducer,
  fetchEventsByIdExtraReducer,
  fetchEventsParticipantsExtraReducer,
  createEventExtraReducer,
  subscribeEventExtraReducer,
  unsubscribeEventExtraReducer,
  fetchMyEventsExtraReducer,
  fetchLikedEventsExtraReducer,
  fetchSavedEventsExtraReducer,
  fetchUpcomingEventsExtraReducer,
} from '../extraReducers';

const initialState = eventsAdapter.getInitialState<EventsState>({
  entities: {},
  ids: [],
  home: {
    ids: [],
    isLoading: false,
    hasMore: true,
    nextCursor: null,
  },
  eventsByUser: {},
  subscribed: {
    ids: [],
    isLoading: false,
    hasMore: true,
    nextCursor: null,
  },
  upcoming: {
    ids: [],
    isLoading: false,
    hasMore: true,
    nextCursor: null,
  },
  liked: {
    ids: [],
    isLoading: false,
    hasMore: true,
    nextCursor: null,
  },
  saved: {
    ids: [],
    isLoading: false,
    hasMore: true,
    nextCursor: null,
  },
  participants: {}
})

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearEventParticipants(state, action: PayloadAction<string>) {
      delete state.participants[action.payload]
    },
    removeEvent(state, action: PayloadAction<string>) {
      eventsAdapter.removeOne(state, action.payload);
      const id = action.payload;
      const filter = (ids: string[]) => ids.filter(i => i !== id);
      state.home.ids       = filter(state.home.ids);
      state.subscribed.ids = filter(state.subscribed.ids);
      state.upcoming.ids   = filter(state.upcoming.ids);
      state.liked.ids      = filter(state.liked.ids);
      state.saved.ids      = filter(state.saved.ids);
      for (const uid of Object.keys(state.eventsByUser)) {
        state.eventsByUser[uid].ids = filter(state.eventsByUser[uid].ids);
      }
    },
  },
  extraReducers: (builder) => {
    fetchAllEventsExtraReducer(builder)
    fetchEventsByUserExtraReducer(builder)
    fetchMyEventsExtraReducer(builder)
    fetchSubscribedEventsExtraReducer(builder)
    fetchEventsByIdExtraReducer(builder)
    fetchEventsParticipantsExtraReducer(builder)
    createEventExtraReducer(builder)
    subscribeEventExtraReducer(builder)
    unsubscribeEventExtraReducer(builder)
    fetchLikedEventsExtraReducer(builder)
    fetchSavedEventsExtraReducer(builder)
    fetchUpcomingEventsExtraReducer(builder)
  },
})

export const {
  reducer: eventsReducer,
  actions: eventsActions,
} = eventsSlice