import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';

export const deleteContactThunk = createAsyncThunk<string, string, ThunkAPI>(
  'contacts/delete',
  async (contactId, { extra, rejectWithValue }) => {
    try {
      await extra.services.user.deleteContact(contactId);
      return contactId;
    } catch (err) {
      const msg = extra.extractErrorMessage(err, 'Failed to delete contact');
      return rejectWithValue(msg);
    }
  },
);
