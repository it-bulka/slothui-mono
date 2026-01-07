import { useAppDispatch } from '@/shared/config/redux';
import { fetchUpcomingEventsThunk } from '../thunk/fetchUpcomingEventsThunk.ts';
import { useCallback } from 'react';

export const useFetchUpcomingEvents = () => {
  const dispatch = useAppDispatch();

  const fetchUpcomingEvents = useCallback((arg: { cursor?: string | null }) => {
    dispatch(fetchUpcomingEventsThunk({ cursor: arg.cursor }))
  }, [dispatch]);


  return { fetchUpcomingEvents };
}