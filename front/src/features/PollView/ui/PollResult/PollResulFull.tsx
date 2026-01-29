import type { PollFullResult } from '../../model/types';
import { List, Typography, AvatarWithInfo } from '@/shared/ui';
import { memo } from 'react';
import type { UserShort } from '@/shared/types';

type PollResultProps = PollFullResult & { className?: string };

export const PollResulFull = memo(({ options, className, anonymous }: PollResultProps) => {
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
              {option.voters?.map((voter: UserShort) => (
                <AvatarWithInfo
                  src={voter.avatarUrl}
                  name={voter.nickname}
                  position={voter.username}
                  key={voter.nickname}
                />
              ))}
            </List>
          )}
        </div>
      ))}
    </div>
  )
})

PollResulFull.displayName = 'PollResultFull';