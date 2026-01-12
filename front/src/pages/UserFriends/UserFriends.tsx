import { useEffect } from 'react';

import { TabWithFriends } from '@/features';
import { useGetFollowers, useGetFollowings } from '@/entities/Friends';
import { useAuthUserSelector } from '@/entities/AuthUser';
import { useFollowersSelector, useFollowingsSelector } from '@/entities/Friends';


const UserFriends = () => {
  const { getUserFollowers } = useGetFollowers()
  const { getFollowings } = useGetFollowings()
  const user = useAuthUserSelector()
  const followers = useFollowersSelector(user?.id)
  const followings = useFollowingsSelector(user?.id)

  useEffect(() => {
    if(!user) return
    getUserFollowers({ userId: user.id })
    getFollowings({ userId: user.id })
  }, [getUserFollowers, getFollowings, user]);

  return (
    <TabWithFriends
      tabs={['Followers', 'Followings']}
      contents={[followers, followings]}
    />
  )
}

export default UserFriends