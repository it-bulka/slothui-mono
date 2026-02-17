import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';
import { updateProfileThunk } from '../../updateProfile/updateProfile.thunk.ts';
import type { UpdateUserDto } from '@/shared/types';

export const useUpdateProfile = () => {
  const dispatch = useAppDispatch();

  const updateProfile = useCallback((arg: UpdateUserDto) => {
    return dispatch(updateProfileThunk(arg))
  }, [dispatch])

  return { updateProfile }
}