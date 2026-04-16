import { Avatar, Typography, TypographyTypes } from '@/shared/ui';
import TrendUpSvg from '@/shared/assets/images/activity/trend-up.svg?react'
import { BlockTitle } from '@/widgets/BlockTitle/BlockTitle.tsx';
import { useProfileAnalyticsSelect, useFetchProfileAnalytics } from '@/entities';
import { useEffect } from 'react';
import classnames from 'classnames';

const getSign = (delta: number) => delta > 0 ? '+' : '';

const getAvatarClassName = (index: number, total: number) =>
  classnames('border border-white', index > 0 && '-ml-[15px]', `z-[${total - index}]`);

const getMessage = (percent: number): string => {
  if (percent >= 50) return 'You gained a substantial amount of followers this month!';
  if (percent >= 10) return 'Your audience is growing steadily.';
  if (percent === 0) return 'Your follower growth stayed stable.';
  if (percent > -20) return 'Follower growth slowed this month.';
  return 'You lost followers this month.';
};

export const ProfileActivity = () => {
  const { data, isLoading, error } = useProfileAnalyticsSelect()
  const { fetchProfileAnalytics } = useFetchProfileAnalytics()

  useEffect(() => {
    if (data || isLoading || error) return;
    fetchProfileAnalytics()
  }, [fetchProfileAnalytics, data, isLoading, error])

  if (isLoading) {
    // TODO: add Skeleton
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>No data</div>
  }

  const isUp = data.delta >= 0;

  return (
    <div>
      <BlockTitle
        title="Profile Activity"
        withMargin
      />

      <div className="bg-light-l1 border-blue-b3 rounded-3xl py-6 px-4 flex flex-col gap-5">
        <div className="flex">
          {data.lastFollowers.map((user, index) => (
            <Avatar
              src={user.avatarUrl ?? undefined}
              key={user.id}
              className={getAvatarClassName(index, data.lastFollowers.length)}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-1">
          <Typography className={classnames('font-bold text-6', isUp ? 'text-green-g1' : 'text-red-r1')}>
            {getSign(data.delta)}{data.delta}
          </Typography>
          <Typography className="grow" color="secondary">Followers</Typography>

          <div className="basis-full" />

          <TrendUpSvg className={classnames('w-5 h-5', isUp ? 'fill-green-g1' : 'rotate-180 fill-red-r1')} />
          <Typography
            type={TypographyTypes.P_SM}
            color="secondary"
            className={classnames('font-bold', isUp ? 'text-green-g2' : 'text-red-r1')}
          >
            {getSign(data.percent)}{Math.abs(data.percent)}%
          </Typography>
          <Typography type={TypographyTypes.P_SM} color="secondary" className="grow">vs last month</Typography>
        </div>

        <Typography type={TypographyTypes.P_SM} color="secondary">
          {getMessage(data.percent)}
        </Typography>
      </div>
    </div>
  )
}
