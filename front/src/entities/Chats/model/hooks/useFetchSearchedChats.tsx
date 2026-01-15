import { useAppDispatch } from '@/shared/config/redux';
import { useMemo, useEffect, useCallback } from 'react';
import { searchChatsThunk } from '../thunk/searchChats.thunk.ts';
import debounce from 'lodash/debounce';

export const useFetchSearchedChats = () => {
  const dispatch = useAppDispatch();

  const searchDebounced = useMemo(
    () =>
      debounce((value: string) => {
        if (!value) return;
        dispatch(searchChatsThunk(value));
      }, 300),
    [dispatch]
  );

  const onSearchChange = useCallback((val: string) => {
    searchDebounced(val);
  }, [searchDebounced]);

  useEffect(() => {
    return () => searchDebounced.cancel();
  }, [searchDebounced]);

  return {
    onSearchChange
  };
}