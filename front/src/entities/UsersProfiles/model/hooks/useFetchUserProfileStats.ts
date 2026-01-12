import { useAppDispatch} from '@/shared/config/redux';
import { useCallback } from 'react';
import { fetchUserProfileStatsThunk } from '../thunk/fetchUserProfileStatsThunk.ts';

export const useFetchUserProfileStats = () => {
  const dispatch = useAppDispatch();

  const fetchUserProfileStats = useCallback((userId: string) => {
    dispatch(fetchUserProfileStatsThunk({ userId }))
  }, [dispatch]);

  return { fetchUserProfileStats}
}