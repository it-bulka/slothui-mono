import { useAppSelector } from '@/shared/config/redux';
import { selectRepliesLoadingByParentId } from '../selectors/selectRepliesLoadingByParentId.ts';

export const useGetRepliesLoading = (parentId?: string) => useAppSelector(
  (state) => selectRepliesLoadingByParentId(state, parentId)
)