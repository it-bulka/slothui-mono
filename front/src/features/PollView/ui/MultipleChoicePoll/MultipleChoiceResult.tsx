import { memo, useId } from 'react';
import { CheckboxInput, Typography, TypographyTypes } from '@/shared/ui';
import type { PollMultipleChoiceResult } from '../../model/types/index.tsx';
import { OptionLabel } from '@/features/PollView/ui/OptionLabel.tsx';
import { PollResultWrapper } from '../PollResult/PollResultWrapper.tsx';
import cls from '../common/styles.module.css';
import { AnonymousTitle } from '@/features/PollView/ui/common/AnonymousTitle.tsx';

export type MultipleChoiceResultProps = PollMultipleChoiceResult
export const MultipleChoiceResult = memo(({
  question,
  options,
  userVote,
  anonymous
}: MultipleChoiceResultProps) => {
  const id = useId()
  return (
    <PollResultWrapper options={options} anonymous={anonymous}>
      <form className={cls.form}>
        {anonymous && <AnonymousTitle />}
        <Typography bold type={TypographyTypes.BLOCK_TITLE}>{question}</Typography>
        {options.map((option, index) => (
          <CheckboxInput
            name={id}
            key={index}
            disabled={true}
            selected={userVote.includes(option.id)}
          >
            <OptionLabel
              value={option.value}
              percentage={option.percentage}
              voters={anonymous ? [] : option.voters}
              votes={option.votes}
            />
          </CheckboxInput>
        ))}
      </form>
    </PollResultWrapper>
  )
})

MultipleChoiceResult.displayName = 'MultipleChoiceResult'