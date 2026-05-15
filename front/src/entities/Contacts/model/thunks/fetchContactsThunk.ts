import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { UserContact } from '@/shared/types/contacts.types';

export const fetchContactsThunk = createAsyncThunk<
  { contacts: UserContact[]; userId: string },
  { userId: string },
  ThunkAPI
>(
  'contacts/fetchByUser',
  async ({ userId }, { extra, rejectWithValue }) => {
    try {
      const contacts = await extra.services.user.getContacts(userId);
      return { contacts, userId };
    } catch {
      return rejectWithValue('Failed to load contacts');
    }
  },
);
