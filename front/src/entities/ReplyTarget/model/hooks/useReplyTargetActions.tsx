import { useAppDispatch } from '@/shared/config/redux';
import { replyTargetActions, type ReplyTargetState } from '@/entities';
import { useCallback } from 'react';

export const useReplyTarget = () => {
  const dispatch = useAppDispatch();

  const setReplyTarget = useCallback((dto: ReplyTargetState) => {
    dispatch(replyTargetActions.setReplyTarget(dto))
  }, [dispatch]);

  const clearReplyTarget = useCallback(() => {
    dispatch(replyTargetActions.resetReplyTarget())
  }, [dispatch])

  const clearReplyTargetForComment = useCallback(() => {
    dispatch(replyTargetActions.resetParentId())
  }, [dispatch])

  return { setReplyTarget, clearReplyTarget, clearReplyTargetForComment }
}