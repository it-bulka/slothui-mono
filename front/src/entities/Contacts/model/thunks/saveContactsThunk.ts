import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { UserContact, SaveContactItem } from '@/shared/types/contacts.types';

export const saveContactsThunk = createAsyncThunk<
  { contacts: UserContact[]; userId: string },
  { items: SaveContactItem[]; userId: string },
  ThunkAPI
>(
  'contacts/save',
  async ({ items, userId }, { extra, rejectWithValue }) => {
    try {
      const contacts = await extra.services.user.saveContacts(items);
      return { contacts, userId };
    } catch (err) {
      return rejectWithValue(extra.extractErrorMessage(err, 'Failed to save contacts'));
    }
  },
);
