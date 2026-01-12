import { useAppDispatch } from '@/shared/config/redux';
import { fetchSuggestions } from '../thunk/fetchSuggestions.ts';
import { useCallback } from 'react';

export const useFetchFriendsSuggestions = () => {
  const dispatch = useAppDispatch();

  const fetchFriendsSuggestions = useCallback((userId: string) => {
    return dispatch(fetchSuggestions({ userId}))
  }, [dispatch]);

  return { fetchFriendsSuggestions }
}