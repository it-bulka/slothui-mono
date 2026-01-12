import { useAppSelector } from '@/shared/config/redux';

export const useAuthUserSelector = () => useAppSelector(state => state.authUser.data);
export const useAuthUserIdSelector = () => useAppSelector(state => state.authUser.data?.id);
export const useAuthUserErrorSelector = () => useAppSelector(state => state.authUser.error);
export const useAuthUserLoadingSelector = () => useAppSelector(state => state.authUser.isLoading);
export const useAuthUserTokenSelector = () => useAppSelector(state => state.authUser.token);

