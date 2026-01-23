import { useAppSelector } from '@/shared/config/redux';

export const useIsPostCreating = () => {
  return useAppSelector(
    state => state.postComposer.isCreating
  );
}