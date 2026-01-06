import { useAppSelector } from '@/shared/config/redux';
import { selectRepliesErrorByParentId } from '../selectors/selectRepliesErrorByParentId.ts';

export const useGetRepliesError = (parentId?: string) => useAppSelector(
  (state) => selectRepliesErrorByParentId(state, parentId)
)