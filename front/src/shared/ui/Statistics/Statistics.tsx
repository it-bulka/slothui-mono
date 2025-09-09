import { memo } from 'react';
import { Typography } from '@/shared/ui';

interface StatisticsProps {
  data: {
    amount: number;
    name: string;
  }[]
}

export const Statistics = memo(({ data }: StatisticsProps) => {
  return (
    <div className="flex w-fit mx-auto my-4">
      {data.map((item) => (
        <div className="p-2 border-style-r last:border-0">
          <Typography center bold>{item.amount}</Typography>
          <Typography center>{item.name}</Typography>
        </div>
      ))}
    </div>
  )
})

Statistics.displayName = 'Statistics'