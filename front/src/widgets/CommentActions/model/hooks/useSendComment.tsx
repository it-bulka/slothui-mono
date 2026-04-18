import { useAddOptimisticReply, useReplyTarget } from '@/entities';
import type { CreateCommentDTO } from '@/shared/libs/services/commentsService/comments.type.ts';
import { toast } from 'react-toastify'
import { useCallback } from 'react';

export const useSendComment = () => {
  const { addOptimisticReply } = useAddOptimisticReply();
  const { clearReplyTargetForComment } = useReplyTarget()

  const sendComment = useCallback(async(dto: CreateCommentDTO, onCreate?: () => void) => {
    await addOptimisticReply({
      text: dto.text,
      postId: dto.postId,
      parentId: dto.parentId,
      onOptimisticAdded: () => {
        clearReplyTargetForComment()
        onCreate?.()
      },
      onFailed: () => toast.info('Failed to create comment')
    })
  }, [addOptimisticReply, clearReplyTargetForComment])

  return { sendComment }
}