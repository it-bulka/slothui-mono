import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';
import { fetchPollDetailsThunk } from '../thunk';

export const useFetchPollDetails = () => {
  const dispatch = useAppDispatch();

  const fetchPollDetails = useCallback((pollId: string) => {
    return dispatch(fetchPollDetailsThunk(pollId))
  }, [dispatch]);

  return { fetchPollDetails }
}