import { memo } from 'react';
import { PollOptionCard } from '../common/PollOptionCard.tsx';
import { LineRange } from '@/shared/ui/LineRange';
import { PollVotersRow } from './PollVotersRow.tsx';
import type { PollAnswerEntity } from '@/entities/Poll/model/type/pollDetails.state.ts';
import commonCls from '../common/styles.module.css';
import cls from './PollResultModal.module.css';

interface PollOptionResultProps {
  option: PollAnswerEntity
  anonymous: boolean
  pollId: string
  isSelected: boolean
  isWinner: boolean
}

export const PollOptionResult = memo(({
  option,
  anonymous,
  pollId,
  isSelected,
  isWinner
}: PollOptionResultProps) => {
  const moreCount = option.votes - option.voters.items.length

  return (
    <PollOptionCard isSelected={isSelected} isWinner={isWinner}>
      <div className={cls.optionHeader}>
        <span className={cls.optionName}>{option.value}</span>
        <span className={cls.percentage}>{option.percentage}%</span>
      </div>

      <LineRange
        percentage={option.percentage}
        className={commonCls.progressTrack}
        barClassName={commonCls.progressGradient}
      />

      {!anonymous && (
        <PollVotersRow
          voters={option.voters.items}
          moreCount={moreCount}
          pollId={pollId}
          answerId={option.id}
        />
      )}
    </PollOptionCard>
  )
})

PollOptionResult.displayName = 'PollOptionResult'
