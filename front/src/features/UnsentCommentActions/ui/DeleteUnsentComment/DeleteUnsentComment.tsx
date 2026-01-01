import { useDeleteUnsentComment } from '@/entities';
import { ActionButton } from '@/shared/ui';
import DeleteIcon from '@/shared/assets/images/actions/delete.svg?react'

export const DeleteUnsentComment = ({ commentId }: { commentId: string }) => {
  const { deleteUnsentComment } = useDeleteUnsentComment()

  return (
    <ActionButton Icon={DeleteIcon} onClick={() => deleteUnsentComment(commentId)}/>
  )
}