import { useAppDispatch } from '@/shared/config/redux';
import { initHomePageThunk } from '../thunk/initHomePage.thunk.ts';
import { useCallback } from 'react';

export const useInitHomePage = () => {
  const dispatch = useAppDispatch();

  const initHomePage = useCallback(() => {
    dispatch(initHomePageThunk())
  }, [dispatch])

  return { initHomePage}
}