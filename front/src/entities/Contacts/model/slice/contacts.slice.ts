import { createSlice } from '@reduxjs/toolkit';
import { contactsAdapter } from '../adapter/contacts.adapter';
import type { ContactsState } from '../types/contacts.types';
import { fetchContactsThunk } from '../thunks/fetchContactsThunk';
import { createContactThunk } from '../thunks/createContactThunk';
import { updateContactThunk } from '../thunks/updateContactThunk';
import { deleteContactThunk } from '../thunks/deleteContactThunk';
import { saveContactsThunk } from '../thunks/saveContactsThunk';

const initialState = contactsAdapter.getInitialState<ContactsState>({
  ids: [],
  entities: {},
  loadingByUser: {},
  errorByUser: {},
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsThunk.pending, (state, action) => {
        state.loadingByUser[action.meta.arg.userId] = true;
        state.errorByUser[action.meta.arg.userId] = undefined;
      })
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        const { contacts, userId } = action.payload;
        // Remove stale contacts for this user before upserting fresh ones
        const staleIds = Object.values(state.entities)
          .filter((c) => c?.userId === userId)
          .map((c) => c!.id);
        contactsAdapter.removeMany(state, staleIds);
        contactsAdapter.upsertMany(state, contacts);
        state.loadingByUser[userId] = false;
      })
      .addCase(fetchContactsThunk.rejected, (state, action) => {
        state.loadingByUser[action.meta.arg.userId] = false;
        state.errorByUser[action.meta.arg.userId] = action.payload;
      })
      .addCase(createContactThunk.fulfilled, (state, action) => {
        contactsAdapter.addOne(state, action.payload);
      })
      .addCase(updateContactThunk.fulfilled, (state, action) => {
        contactsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        contactsAdapter.removeOne(state, action.payload);
      })
      .addCase(saveContactsThunk.fulfilled, (state, action) => {
        const { contacts, userId } = action.payload;
        const staleIds = Object.values(state.entities)
          .filter((c) => c?.userId === userId)
          .map((c) => c!.id);
        contactsAdapter.removeMany(state, staleIds);
        contactsAdapter.upsertMany(state, contacts);
      });
  },
});

export const { reducer: contactsReducer } = contactsSlice;
