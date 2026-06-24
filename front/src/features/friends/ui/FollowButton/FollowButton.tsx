import { Button } from '@/shared/ui/Button/Button';
import { useFollowUser } from '@/entities/Friends';
import { memo } from 'react';

export const FollowButton = memo(({ userId }: { userId: string }) => {
  const { followUser } = useFollowUser()
  return (
    <Button
      onClick={() => followUser(userId)}
      variant="soft"
      size="md"
    >
      Follow
    </Button>
  )
})

FollowButton.displayName = 'FollowButton'