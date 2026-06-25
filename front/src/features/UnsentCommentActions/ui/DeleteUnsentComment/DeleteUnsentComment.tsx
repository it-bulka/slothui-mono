import { useDeleteUnsentComment } from '@/entities/Comment';
import { ActionButton } from '@/shared/ui/ActionButton';
import DeleteIcon from '@/shared/assets/images/actions/delete.svg?react'

export const DeleteUnsentComment = ({ commentId }: { commentId: string }) => {
  const { deleteUnsentComment } = useDeleteUnsentComment()

  return (
    <ActionButton Icon={DeleteIcon} onClick={() => deleteUnsentComment(commentId)} aria-label="Delete unsent comment"/>
  )
}