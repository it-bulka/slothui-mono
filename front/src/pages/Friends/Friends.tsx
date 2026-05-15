import { TabWithFriends, UserSearchToolbar } from '@/features';
import { useAuthUserSelector } from '@/entities';
import { ToolbarWrapper, Typography } from '@/shared/ui';
import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

const Friends = memo(() => {
  const user = useAuthUserSelector()

  if(!user) return <Typography>User is not authorized</Typography>
  return (
    <>
      <Helmet><title>Friends — SlothUI</title></Helmet>
      <ToolbarWrapper>
        <UserSearchToolbar />
      </ToolbarWrapper>
      <TabWithFriends userId={user.id} />
    </>
  )
})
Friends.displayName = 'FriendsPage';

export default Friends