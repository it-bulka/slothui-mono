import { TabWithFriends } from '@/features/friends/ui/TabWithFriends/TabWithFriends';
import { UserSearchToolbar } from '@/features/user-search/ui/UserSearchToolbar/UserSearchToolbar';
import { useAuthUserSelector } from '@/entities/AuthUser';
import { ToolbarWrapper } from '@/shared/ui/ToolbarWrapper'
import { Typography } from '@/shared/ui/Typography/Typography';
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