import { useEffect } from 'react';

import { TabWithFriends } from '@/features';
import { useGetFollowers, useGetFollowings } from '@/entities/Friends';
import { useUserSelector } from '@/entities/User';
import { useFollowersSelector, useFollowingsSelector } from '@/entities/Friends';


const UserFriends = () => {
  const { getUserFollowers } = useGetFollowers()
  const { getFollowings } = useGetFollowings()
  const user = useUserSelector()
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