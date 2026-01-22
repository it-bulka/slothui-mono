import { useAppSelector } from '@/shared/config/redux';
import type { RootState } from '@/app/config';

export const selectAuthUser = (state: RootState) => state.authUser.data

export const useAuthUserSelector = () => useAppSelector(selectAuthUser);
export const useAuthUserIdSelector = () => useAppSelector(state => state.authUser.data?.id);
export const useAuthUserErrorSelector = () => useAppSelector(state => state.authUser.error);
export const useAuthUserLoadingSelector = () => useAppSelector(state => state.authUser.isLoading);
export const useAuthUserTokenSelector = () => useAppSelector(state => state.authUser.isToken);

