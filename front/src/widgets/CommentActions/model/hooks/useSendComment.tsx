import { useAddOptimisticReply } from '@/entities';
import type { CreateCommentDTO } from '@/shared/libs/services/commentsService/comments.type.ts';
import { toast } from 'react-toastify'
import { useReplyTarget } from '@/entities';

export const useSendComment = () => {
  const { addOptimisticReply } = useAddOptimisticReply();
  const { clearReplyTargetForComment } = useReplyTarget()

  const sendComment = (dto: CreateCommentDTO, onCreate?: () => void) => {
    addOptimisticReply({
      text: dto.text,
      postId: dto.postId,
      parentId: dto.parentId,
      onOptimisticAdded: () => {
        clearReplyTargetForComment()
        onCreate?.()
      },
      onFailed: () => toast.info('Failed to create comment')
    })
  }

  return { sendComment }
}