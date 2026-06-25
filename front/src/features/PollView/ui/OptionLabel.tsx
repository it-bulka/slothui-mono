import { Typography } from '@/shared/ui/Typography/Typography';
import { LineRange } from '@/shared/ui/LineRange';
import { memo } from 'react';
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback';
import AvatarDefaultImg from '@/shared/assets/images/general/avatar-default.png';
import cls from './common/styles.module.css';
import type { VoterDetails } from '@/shared/types';

interface OptionLabelProps {
  value: string;
  voters?: VoterDetails[];
  votes?: number;
  percentage?: number;
}

export const OptionLabel = memo(({ value, votes, voters, percentage = 0 }: OptionLabelProps) => {
  const isResultMode = votes !== undefined

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <Typography className="grow text-xs">{value}</Typography>

        {!!voters?.length && (
          <div className="inline-flex -space-x-1">
            {voters.slice(0, 3).map((voter) => (
              <ImageWithFallback
                key={voter.id}
                fallback={AvatarDefaultImg}
                src={voter.avatarUrl ?? ''}
                alt={`${voter.nickname}'s avatar`}
                className="block rounded-full w-[24px] h-[24px]"
              />
            ))}
          </div>
        )}

        {isResultMode && (
          <span className="text-blue-b1 text-xs font-semibold tabular-nums min-w-[2rem] text-right">
            {percentage}%
          </span>
        )}
      </div>

      {isResultMode && (
        <LineRange
          percentage={percentage}
          className={`w-full ${cls.progressTrack}`}
          barClassName={cls.progressGradient}
        />
      )}
    </div>
  )
})

OptionLabel.displayName = 'OptionLabel'
