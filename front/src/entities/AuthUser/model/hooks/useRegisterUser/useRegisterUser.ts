import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';
import { registerUser } from '../../register/registerUser.thunk.ts';
import type { RegisterUserArgs } from '@/shared/types';

export const useRegisterUser = () => {
  const dispatch = useAppDispatch();

  const register = useCallback((arg: RegisterUserArgs) => {
    return dispatch(registerUser(arg))
  }, [dispatch])

  return { registerUser: register }
}