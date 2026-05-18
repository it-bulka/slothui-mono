import { Button } from '@/shared/ui/Button/Button';
import { useUnfollow } from '@/entities/Friends';
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