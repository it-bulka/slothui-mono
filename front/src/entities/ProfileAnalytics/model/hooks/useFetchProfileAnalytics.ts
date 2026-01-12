import { useAppDispatch } from '@/shared/config/redux';
import { fetchProfileAnalyticsThunk } from '../thunks/fetchProfileAnalyticsThunk.ts';
import { useCallback } from 'react';

export const useFetchProfileAnalytics = () => {
  const dispatch = useAppDispatch();

  const fetchProfileAnalytics = useCallback(() => {
    dispatch(fetchProfileAnalyticsThunk())
  }, [dispatch]);

  return { fetchProfileAnalytics}
}