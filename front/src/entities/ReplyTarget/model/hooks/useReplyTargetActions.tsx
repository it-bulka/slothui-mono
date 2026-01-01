import { useAppDispatch } from '@/shared/config/redux';
import { replyTargetActions, type ReplyTargetState } from '@/entities';

export const useReplyTarget = () => {
  const dispatch = useAppDispatch();

  const setReplyTarget = (dto: ReplyTargetState) => {
    dispatch(replyTargetActions.setReplyTarget(dto))
  }

  const clearReplyTarget = () => {
    dispatch(replyTargetActions.resetReplyTarget())
  }

  const clearReplyTargetForComment = () => {
    dispatch(replyTargetActions.resetParentId())
  }

  return { setReplyTarget, clearReplyTarget, clearReplyTargetForComment }
}