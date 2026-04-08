import { memo } from 'react';
import { Typography } from '@/shared/ui';
import { Link } from 'react-router';

interface StatisticsHrefs {
  posts?: string;
  followers?: string;
  following?: string;
}

interface StatisticsProps {
  followersCount: number;
  followingCount: number;
  postsCount: number;
  hrefs?: StatisticsHrefs;
}

const statisticsTypes = [
  { name: 'Posts',     key: 'postsCount',     hrefKey: 'posts'     as const, amountProp: 'postsCount'     as const },
  { name: 'Followers', key: 'followersCount', hrefKey: 'followers' as const, amountProp: 'followersCount' as const },
  { name: 'Following', key: 'followingCount', hrefKey: 'following' as const, amountProp: 'followingCount' as const },
];

export const Statistics = memo(({ hrefs, ...props }: StatisticsProps) => {
  return (
    <div className="flex w-fit mx-auto my-4">
      {statisticsTypes.map(({ name, key, hrefKey, amountProp }) => {
        const href = hrefs?.[hrefKey]
        return (
          <div className="p-2 border-style-r last:border-0 relative" key={key}>
            <Typography center bold>{props[amountProp]}</Typography>
            <Typography center>{name}</Typography>
            {href && <Link to={href} className="absolute inset-0 bg-transparent"/>}
          </div>
        )
      })}
    </div>
  )
})

Statistics.displayName = 'Statistics'