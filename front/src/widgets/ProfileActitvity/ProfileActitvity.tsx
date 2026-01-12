import { Avatar, Typography, TypographyTypes } from '@/shared/ui';
import AvatarMock from '@/mock/images/avatar.png'
import TrendUpSvg from '@/shared/assets/images/activity/trend-up.svg?react'
import { BlockTitle } from '@/widgets/BlockTitle/BlockTitle.tsx';
import { useProfileAnalyticsSelect, useFetchProfileAnalytics } from '@/entities';
import { useEffect } from 'react';

// TODO: add fetching last added followers; limit = 4
const lastAddedFriends: string[] = [
  AvatarMock, AvatarMock, AvatarMock, AvatarMock
]

export const ProfileActivity = () => {
  const { data, isLoading, error } = useProfileAnalyticsSelect()
  const { fetchProfileAnalytics } = useFetchProfileAnalytics()

  useEffect(() => {
    // TODO: add fetching amount limit
    if(data || isLoading || error) return;
    fetchProfileAnalytics()
  }, [fetchProfileAnalytics, data, isLoading, error])

  if(isLoading) {
    // TODO: add Skeleton
    return <div>Loading...</div>
  }

  if(!data) {
    return <div>No data</div>
  }

  return (
    <div>
      <BlockTitle
        title="Profile Activity"
        withMargin
      />

      <div className="bg-light-l1 border-blue-b3 rounded-3xl py-6 px-4 flex flex-col gap-5">
        <div className="flex -space-x-3 first:space-x-0">
          {lastAddedFriends.map((avatar, ind) => <Avatar src={avatar} key={ind} className="border border-white"/>)}
        </div>

        <div className="flex flex-wrap gap-1">
          <Typography className="font-bold text-6">+153</Typography> {/*TODO: add dynamic*/}
          <Typography className="grow" color="secondary">Followers</Typography>

          <div className="basis-full" />

          <TrendUpSvg className="w-5 h-5 fill-green-g1"/>
          <Typography type={TypographyTypes.P_SM} color="secondary" className="text-green-g2 font-bold">23%</Typography>
          <Typography type={TypographyTypes.P_SM} color="secondary" className="grow">vs last month</Typography>
        </div>
        <Typography type={TypographyTypes.P_SM} color="secondary">
          You gained a substantial amount of followers this month!
        </Typography>
      </div>
    </div>
  )
}