import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { UserContact, UpdateContactDto } from '@/shared/types/contacts.types';

export const updateContactThunk = createAsyncThunk<
  UserContact,
  { id: string; dto: UpdateContactDto },
  ThunkAPI
>(
  'contacts/update',
  async ({ id, dto }, { extra, rejectWithValue }) => {
    try {
      return await extra.services.user.updateContact(id, dto);
    } catch (err) {
      const msg = extra.extractErrorMessage(err, 'Failed to update contact');
      return rejectWithValue(msg);
    }
  },
);
