import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { UserContact, CreateContactDto } from '@/shared/types/contacts.types';

export const createContactThunk = createAsyncThunk<UserContact, CreateContactDto, ThunkAPI>(
  'contacts/create',
  async (dto, { extra, rejectWithValue }) => {
    try {
      return await extra.services.user.createContact(dto);
    } catch (err) {
      const msg = extra.extractErrorMessage(err, 'Failed to create contact');
      return rejectWithValue(msg);
    }
  },
);
