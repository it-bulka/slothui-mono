import { memo } from 'react';import { PollOptionResult } from './PollOptionResult.tsx';
import type { PollAnswerEntity } from '@/entities/Poll/model/type/pollDetails.state.ts';

type PollResultProps = {
  options: PollAnswerEntity[]
  anonymous: boolean
  className?: string
  pollId: string
}

export const PollResultFull = memo(
  ({ options, anonymous, className, pollId }: PollResultProps) => {
    return (
      <div className={className}>
        {options.map((option) => (
          <PollOptionResult
            key={option.id}
            option={option}
            anonymous={anonymous}
            pollId={pollId}
            answerId={option.id}
          />
        ))}
      </div>
    )
  }
)
PollResultFull.displayName = 'PollResultFull';