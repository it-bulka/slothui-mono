import type { PollFullResult } from '../../model/types';
import { List, Typography, AvatarWithInfo } from '@/shared/ui';
import { memo } from 'react';

type PollResultProps = PollFullResult & { className?: string };

export const PollResult = memo(({ options, className, anonymous }: PollResultProps) => {
  return (
    <div className={className}>
      {options.map((option) => (
        <div key={option.id}>
          <Typography bold className="border-b-2 border-gray-g1 bg-gray-g2">{option.value}</Typography>
          <Typography className="flex justify-between">
            <span>{option.voters.length} votes</span>
            <span>{option.percentage}%</span>
          </Typography>
          {anonymous || (
            <List>
              {option.voters.map(voter => (
                <AvatarWithInfo src={voter.avatar} name={voter.name} position=""/>
              ))}
            </List>
          )}
        </div>
      ))}
    </div>
  )
})

PollResult.displayName = 'PollResult';