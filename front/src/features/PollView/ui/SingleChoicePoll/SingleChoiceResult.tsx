import { memo, useId } from 'react';
import { OptionLabel } from '../OptionLabel.tsx';
import { Typography, TypographyTypes, RadioInput } from '@/shared/ui';
import { PollResultWrapper } from '../PollResult/PollResultWrapper.tsx';
import cls from '../common/styles.module.css';
import { AnonymousTitle } from '@/features/PollView/ui/common/AnonymousTitle.tsx';
import type { SingleChoicePollResultDto } from '@/shared/types/poll.dto.ts';

export type SingleChoiceResultProps = {
  poll: SingleChoicePollResultDto
}
export const SingleChoiceResult = memo(({
  poll
}: SingleChoiceResultProps) => {
  const id = useId()
  return (
    <PollResultWrapper options={poll.answers} anonymous={poll.anonymous}>
      <form className={cls.form}>
        {poll.anonymous && <AnonymousTitle />}
        <Typography bold type={TypographyTypes.BLOCK_TITLE}>{poll.question}</Typography>
        {poll.answers.map((option, index) => (
          <RadioInput
            name={id}
            key={index}
            disabled={true}
            selected={Boolean(poll.userVote && option.id === poll.userVote[0])}
          >
            <OptionLabel
              value={option.value}
              percentage={option.percentage}
              voters={poll.anonymous ? [] : option.voters}
              votes={option.votes}
            />
          </RadioInput>
        ))}
      </form>
    </PollResultWrapper>
  )
})

SingleChoiceResult.displayName = 'SingleChoiceResult'