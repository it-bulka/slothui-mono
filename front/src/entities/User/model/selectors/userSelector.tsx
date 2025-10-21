import { useAppSelector } from '@/app/config/store/config.ts';

export const useUserSelector = () => useAppSelector(state => state.user.data);
export const useUserErrorSelector = () => useAppSelector(state => state.user.error);
export const useUserLoadingSelector = () => useAppSelector(state => state.user.isLoading);
export const useUserTokenSelector = () => useAppSelector(state => state.user.token);

