import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { UpdateUserDto, UserShort } from '@/shared/types';

export const updateProfileThunk = createAsyncThunk<
  UserShort,
  UpdateUserDto,
  ThunkAPI
>(
  'updateProfile',
  async (dto, thunkAPI)=> {
    const { extra, rejectWithValue } = thunkAPI;
    try {
      const userService = extra.services.user;
      return await userService.updateProfileData(dto);
    } catch (err) {
      const errMsg = extra.extractErrorMessage(err, 'Failed to update profile');
      return rejectWithValue(errMsg)
    }
  })