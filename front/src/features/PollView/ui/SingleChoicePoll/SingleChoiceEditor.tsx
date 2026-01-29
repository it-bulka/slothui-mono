import { useForm, Controller } from 'react-hook-form';
import { useCallback, memo } from 'react';
import { OptionLabel } from '../OptionLabel.tsx';
import { RadioInput, TypographyTypes, Typography } from '@/shared/ui';
import cls from '../common/styles.module.css';
import { AnonymousTitle } from '../common/AnonymousTitle.tsx';
import type { SingleChoicePollDto } from '@/shared/types/poll.dto.ts';
import type { PollDraft } from '../../../CreatePoll';

const FORM_FIELD = 'answerId'

type FormValues = {
  [FORM_FIELD]: string
}

export interface SingleChoiceEditorProps {
  poll: SingleChoicePollDto | PollDraft
  onSubmit?: (arg: {pollId: string, answerIds: string[]}) => void
}

export const SingleChoiceEditor = memo(({
  poll,
  onSubmit
}: SingleChoiceEditorProps) => {
  const { handleSubmit, control } = useForm<FormValues>()

  const submitSelectedAnswer = useCallback((data: FormValues) => {
    const answer = data[FORM_FIELD]
    onSubmit?.({
      pollId: poll.id,
      answerIds: [answer]
    })
  }, [poll.id, onSubmit])
  
  return (
    <form onSubmit={handleSubmit(submitSelectedAnswer)} className={cls.form}>
      {poll.anonymous && <AnonymousTitle />}
      <Typography bold type={TypographyTypes.BLOCK_TITLE}>{poll.question}</Typography>
      {poll.answers.map((option, index) => (
        <Controller
          control={control}
          name={FORM_FIELD}
          render={({ field, formState }) => (
            <RadioInput
              name={field.name}
              key={index}
              onChange={(checked) => {
                if(checked) {
                  field.onChange(option.id)
                  handleSubmit(submitSelectedAnswer)()
                }
              }}
              disabled={formState.isSubmitting || formState.isSubmitted}
              selected={field.value === option.id}
            >
              <OptionLabel value={option.value} percentage={0}/>
            </RadioInput>
          )}
          key={option.value}
        />
      ))}
    </form>
  )
})

SingleChoiceEditor.displayName = 'SingleChoiceEditor'