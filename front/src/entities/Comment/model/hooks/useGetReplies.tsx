import { useAppSelector } from '@/shared/config/redux';
import { selectRepliesByParentId } from '../selectors/selectRepliesByParentId.ts';
import { selectRepliesIdsByParentId } from '../selectors/selectRepliesIdsByParentId.ts';

export const useGetReplies = (parentId?: string) => useAppSelector(
  (state) => selectRepliesByParentId(state, parentId)
)

export const useGetRepliesIds = (parentId?: string) => useAppSelector(
  (state) => selectRepliesIdsByParentId(state, parentId)
)