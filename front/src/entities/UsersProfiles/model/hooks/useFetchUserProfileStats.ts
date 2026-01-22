import { useAppDispatch} from '@/shared/config/redux';
import { useCallback } from 'react';
import { fetchUserProfileDataThunk } from '../thunk/fetchUserProfileDataThunk.ts';

export const useFetchUserProfileStats = () => {
  const dispatch = useAppDispatch();

  const fetchUserProfileStats = useCallback((userId: string) => {
    console.log('fetchUserProfileStats for', userId);
    dispatch(fetchUserProfileDataThunk({ userId }))
  }, [dispatch]);

  return { fetchUserProfileStats}
}