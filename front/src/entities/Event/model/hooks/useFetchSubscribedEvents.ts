import { useAppDispatch } from '@/shared/config/redux';
import { fetchSubscribedEventsThunk } from '../thunk/fetchSubscribedEvents.thunk.ts';
import { useCallback } from 'react';

export const useFetchSubscribedEvents = () => {
  const dispatch = useAppDispatch();

  const fetchSubscribedEvents = useCallback((arg: { cursor?: string | null }) => {
    dispatch(fetchSubscribedEventsThunk({ cursor: arg.cursor }))
  }, [dispatch]);


  return { fetchSubscribedEvents };
}