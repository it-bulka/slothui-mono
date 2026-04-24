import { useAppDispatch } from '@/shared/config/redux';
import { initHomePageThunk } from '../thunk/initHomePage.thunk.ts';
import { useEffect } from 'react';

export const useInitHomePage = () => {
  const dispatch = useAppDispatch();

  useEffect(()=> {
    if(dispatch) {
      dispatch(initHomePageThunk())
    }
  }, [dispatch])
}