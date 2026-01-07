import { TabWithFriends } from '@/features';
import {
  useNewFollowersIdsSelect,
  useUserSelector,
  useFollowersWithNewOnTopSelect,
  useFollowingsSelector
} from '@/entities';
import { Typography } from '@/shared/ui';

const Friends = () => {
  const user = useUserSelector()
  const newFollowerIds = useNewFollowersIdsSelect(user?.id);
  const followers = useFollowersWithNewOnTopSelect(user?.id);
  const followings = useFollowingsSelector(user?.id);

  if(!user) return <Typography>User is not authorized</Typography>
  return (
    <>
      <TabWithFriends
        tabs={['followers', 'followings']}
        contents={[followers, followings]}
        newFollowerIds={newFollowerIds}
      />
    </>
  )
}

export default Friends