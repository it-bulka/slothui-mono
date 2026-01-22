import { Button } from '@/shared/ui';
import { useFollowUser } from '@/entities';
import { memo } from 'react';

export const FollowButton = memo(({ userId }: { userId: string }) => {
  const { followUser } = useFollowUser()
  return (
    <Button
      onClick={() => followUser(userId)}
      variant="link"
    >
      Follow
    </Button>
  )
})

FollowButton.displayName = 'FollowButton'