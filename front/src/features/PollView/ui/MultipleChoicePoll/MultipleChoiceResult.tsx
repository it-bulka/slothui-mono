import { memo, useId } from 'react';
import { CheckboxInput, Typography, TypographyTypes } from '@/shared/ui';
import { OptionLabel } from '@/features/PollView/ui/OptionLabel.tsx';
import { PollResultWrapper } from '../PollResult/PollResultWrapper.tsx';
import cls from '../common/styles.module.css';
import { AnonymousTitle } from '@/features/PollView/ui/common/AnonymousTitle.tsx';
import type { MultipleChoicePollResultDto } from '@/shared/types/poll.dto.ts';

export interface MultipleChoiceResultProps {
  poll: MultipleChoicePollResultDto
}
export const MultipleChoiceResult = memo(({
  poll
}: MultipleChoiceResultProps) => {
  const id = useId()
  return (
    <PollResultWrapper options={poll.answers} anonymous={poll.anonymous}>
      <form className={cls.form}>
        {poll.anonymous && <AnonymousTitle />}
        <Typography bold type={TypographyTypes.BLOCK_TITLE}>{poll.question}</Typography>
        {poll.answers.map((option, index) => (
          <CheckboxInput
            name={id}
            key={index}
            disabled={true}
            selected={poll.userVote.includes(option.id)}
          >
            <OptionLabel
              value={option.value}
              percentage={option.percentage}
              voters={poll.anonymous ? [] : option.voters}
              votes={option.votes}
            />
          </CheckboxInput>
        ))}
      </form>
    </PollResultWrapper>
  )
})

MultipleChoiceResult.displayName = 'MultipleChoiceResult'