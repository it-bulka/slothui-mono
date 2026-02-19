import { useAppDispatch } from '@/shared/config/redux';
import { deleteProfileThunk } from '../../deleteProfile/deleteProfile.thunk.ts';
import { useCallback } from 'react';

export const useDeleteProfile = () => {
  const dispatch = useAppDispatch();

  const deleteProfile = useCallback(() => {
    dispatch(deleteProfileThunk());
  }, [dispatch]);

  return { deleteProfile };
}