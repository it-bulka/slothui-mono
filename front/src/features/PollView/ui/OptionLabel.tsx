import { Typography, LineRange } from '@/shared/ui';
import { memo } from 'react';
import type { Voter } from '../model/types';
import AvatarDefaultImg from '@/shared/assets/images/general/avatar-default.png'
import { ImageWithFallback } from '@/shared/ui';

interface OptionLableProps {
  value: string;
  voters?: Voter[];
  votes?: number;
  percentage?: number;
}

export const OptionLabel = memo(({ value, votes, voters, percentage = 0 }: OptionLableProps) => {
  return (
    <div>
      <div className="flex wrap gap-1">
        <Typography className="grow">{value}</Typography>
        {!!voters?.length && (
          <div className="inline-flex -space-x-1">
            {voters.slice(0, 3).map((voter) => (
              <ImageWithFallback
                fallback={AvatarDefaultImg}
                src={voter.avatar}
                alt={`${voter.name}\`s avatar`}
                className="block rounded-full w-[24px] h-[24px] border-2 border-gray-50"
              />
            ))}
          </div>
        )}
        <Typography>{votes}</Typography>
      </div>

      <LineRange percentage={percentage} className="w-full" />
    </div>
  )
})

OptionLabel.displayName = 'OptionLabel';