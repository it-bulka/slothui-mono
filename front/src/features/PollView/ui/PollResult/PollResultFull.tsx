import { memo, useMemo } from 'react';
import { PollOptionResult } from './PollOptionResult.tsx';
import type { PollAnswerEntity } from '@/entities/Poll/model/type/pollDetails.state.ts';
import cls from './PollResultModal.module.css';

interface PollResultFullProps {
  options: PollAnswerEntity[]
  anonymous: boolean
  pollId: string
  userVote: string[] | null
}

export const PollResultFull = memo(({
  options,
  anonymous,
  pollId,
  userVote
}: PollResultFullProps) => {
  const maxPercentage = useMemo(
    () => Math.max(0, ...options.map((o) => o.percentage)),
    [options]
  )

  return (
    <div className={cls.optionsList} role="group" aria-label="Poll results">
      {options.map((option) => {
        const isSelected = userVote?.includes(option.id) ?? false
        const isWinner = option.votes > 0 && option.percentage === maxPercentage

        return (
          <PollOptionResult
            key={option.id}
            option={option}
            anonymous={anonymous}
            pollId={pollId}
            isSelected={isSelected}
            isWinner={isWinner}
          />
        )
      })}
    </div>
  )
})

PollResultFull.displayName = 'PollResultFull'
