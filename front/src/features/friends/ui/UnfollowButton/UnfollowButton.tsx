import { Button } from '@/shared/ui';
import { useUnfollow } from '@/entities';
import { memo } from 'react';

export const UnfollowButton = memo(({ userId }: { userId: string }) => {
  const { unfollow } = useUnfollow()
  return (
    <Button
      onClick={() => unfollow(userId)}
      variant="link"
    >
      Unfollow
    </Button>
  )
})

UnfollowButton.displayName = 'UnfollowButton'