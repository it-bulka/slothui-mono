import { useAppSelector } from '@/shared/config/redux';
import type { RootState } from '@/app/config';
import { createSelector } from '@reduxjs/toolkit';

export const selectAuthUser = (state: RootState) => state.authUser.data
export const selectAuthUserId = createSelector(
  (state: RootState) => state.authUser.data,
  (user) => user?.id
)

export const useAuthUserSelector = () => useAppSelector(selectAuthUser);
export const useAuthUserIdSelector = () => useAppSelector(selectAuthUserId);
export const useAuthUserErrorSelector = () => useAppSelector(state => state.authUser.error);
export const useAuthUserLoadingSelector = () => useAppSelector(state => state.authUser.isLoading);
export const useAuthUserTokenSelector = () => useAppSelector(state => state.authUser.isToken);

