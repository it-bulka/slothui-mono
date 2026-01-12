import { memo } from 'react';
import { Typography } from '@/shared/ui';
import { Link } from 'react-router';

interface StatisticsProps {
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

const statisticsTypes = [
  { name: 'Posts', key: 'postsCount', href: '/', amountProp: 'postsCount' },
  { name: 'Followers', key: 'followersCount', href: '/', amountProp: 'followersCount' },
  { name: 'Following', key: 'followingCount', href: '/', amountProp: 'followingCount' },
] as const;

export const Statistics = memo((props: StatisticsProps) => {
  return (
    <div className="flex w-fit mx-auto my-4">
      {statisticsTypes.map(({ name, key, href, amountProp }) => (
        <div className="p-2 border-style-r last:border-0 relative" key={key}>
          <Typography center bold>{props[amountProp]}</Typography>
          <Typography center>{name}</Typography>

          <Link to={href} className="absolute inset-0 bg-transparent"/>
        </div>
      ))}
    </div>
  )
})

Statistics.displayName = 'Statistics'