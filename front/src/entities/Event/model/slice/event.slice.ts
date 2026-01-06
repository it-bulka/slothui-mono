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
  unsubscribeEventExtraReducer
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
  participants: {}
})

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearEventParticipants(state, action: PayloadAction<string>) {
      delete state.participants[action.payload]
    }
  },
  extraReducers: (builder) => {
    fetchAllEventsExtraReducer(builder)
    fetchEventsByUserExtraReducer(builder)
    fetchSubscribedEventsExtraReducer(builder)
    fetchEventsByIdExtraReducer(builder)
    fetchEventsParticipantsExtraReducer(builder)
    createEventExtraReducer(builder)
    subscribeEventExtraReducer(builder)
    unsubscribeEventExtraReducer(builder)
  },
})

export const {
  reducer: eventsReducer,
  actions: eventsActions,
} = eventsSlice