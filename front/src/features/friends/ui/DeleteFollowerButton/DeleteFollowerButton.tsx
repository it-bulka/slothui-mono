import { ActionButton } from '@/shared/ui';
import { useRemoveFollower } from '@/entities';
import DeleteIcon from '@/shared/assets/images/actions/delete.svg?react'
import { memo } from 'react';

export const DeleteFollowerButton = memo(({ userId }: { userId: string }) => {
  const { removeFollower } = useRemoveFollower()

  return (
    <ActionButton
      Icon={DeleteIcon}
      onClick={() => removeFollower(userId)}
    />
  )
})

DeleteFollowerButton.displayName = 'DeleteFollowerButton';