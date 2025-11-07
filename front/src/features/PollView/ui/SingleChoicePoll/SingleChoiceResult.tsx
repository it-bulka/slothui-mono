import { memo, useId } from 'react';
import { OptionLabel } from '../OptionLabel.tsx';
import type { PollSingleChoiceResult } from '../../model/types';
import { Typography, TypographyTypes, RadioInput } from '@/shared/ui';
import { PollResultWrapper } from '../PollResult/PollResultWrapper.tsx';
import cls from '../common/styles.module.css';
import { AnonymousTitle } from '@/features/PollView/ui/common/AnonymousTitle.tsx';

export type SingleChoiceResultProps = PollSingleChoiceResult
export const SingleChoiceResult = memo(({
  question,
  options,
  userVote,
  anonymous
}: SingleChoiceResultProps) => {
  const id = useId()
  return (
    <PollResultWrapper options={options} anonymous={anonymous}>
      <form className={cls.form}>
        {anonymous && <AnonymousTitle />}
        <Typography bold type={TypographyTypes.BLOCK_TITLE}>{question}</Typography>
        {options.map((option, index) => (
          <RadioInput
            name={id}
            key={index}
            disabled={true}
            selected={option.id === userVote}
          >
            <OptionLabel
              value={option.value}
              percentage={option.percentage}
              voters={anonymous ? [] : option.voters}
              votes={option.votes}
            />
          </RadioInput>
        ))}
      </form>
    </PollResultWrapper>
  )
})

SingleChoiceResult.displayName = 'SingleChoiceResult'