import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';
import { fetchPollVotersThunk, type PollVotersArg } from '../thunk';

export const useFetchMorePollVoters = () => {
  const dispatch = useAppDispatch();

  const fetchVoters = useCallback((arg: PollVotersArg) => {
    return dispatch(fetchPollVotersThunk(arg))
  }, [dispatch]);

  return { fetchVoters }
}