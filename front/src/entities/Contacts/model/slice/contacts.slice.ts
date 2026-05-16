import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { contactsAdapter } from '../adapter/contacts.adapter';
import type { ContactsState } from '../types/contacts.types';
import type { UserContact } from '@/shared/types/contacts.types';
import { fetchContactsThunk } from '../thunks/fetchContactsThunk';
import { createContactThunk } from '../thunks/createContactThunk';
import { updateContactThunk } from '../thunks/updateContactThunk';
import { deleteContactThunk } from '../thunks/deleteContactThunk';
import { saveContactsThunk } from '../thunks/saveContactsThunk';

function replaceContactsForUser(state: ContactsState, userId: string, contacts: UserContact[]) {
  const staleIds = Object.values(state.entities)
    .filter((c) => c?.userId === userId)
    .map((c) => c!.id);
  contactsAdapter.removeMany(state, staleIds);
  contactsAdapter.upsertMany(state, contacts);
  state.fetchedByUser[userId] = true;
}

const initialState = contactsAdapter.getInitialState<ContactsState>({
  ids: [],
  entities: {},
  loadingByUser: {},
  errorByUser: {},
  fetchedByUser: {},
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContactsForUser: (
      state,
      action: PayloadAction<{ userId: string; contacts: UserContact[] }>,
    ) => {
      const { contacts, userId } = action.payload;
      replaceContactsForUser(state, userId, contacts);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsThunk.pending, (state, action) => {
        state.loadingByUser[action.meta.arg.userId] = true;
        state.errorByUser[action.meta.arg.userId] = undefined;
      })
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        const { contacts, userId } = action.payload;
        state.loadingByUser[userId] = false;
        replaceContactsForUser(state, userId, contacts);
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
        replaceContactsForUser(state, userId, contacts);
      });
  },
});

export const { reducer: contactsReducer, actions: contactsActions } = contactsSlice;
