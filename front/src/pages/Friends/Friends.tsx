import { TabWithFriends, UserSearchToolbar } from '@/features';
import { useAuthUserSelector } from '@/entities';
import { ToolbarWrapper, Typography } from '@/shared/ui';
import { memo } from 'react';

const Friends = memo(() => {
  const user = useAuthUserSelector()

  if(!user) return <Typography>User is not authorized</Typography>
  return (
    <>
      <ToolbarWrapper>
        <UserSearchToolbar />
      </ToolbarWrapper>
      <TabWithFriends userId={user.id} />
    </>
  )
})
Friends.displayName = 'FriendsPage';

export default Friends