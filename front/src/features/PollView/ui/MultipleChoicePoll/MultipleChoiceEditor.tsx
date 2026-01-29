import { useForm, Controller } from 'react-hook-form';
import { useCallback, memo } from 'react';
import { CheckboxInput, Typography, TypographyTypes, Button } from '@/shared/ui';
import { OptionLabel } from '@/features/PollView/ui/OptionLabel.tsx';
import cls from '../common/styles.module.css'
import { AnonymousTitle } from '@/features/PollView/ui/common/AnonymousTitle.tsx';
import type { MultipleChoicePollDto } from '@/shared/types/poll.dto.ts';
import type { PollDraft } from '@/features';

const FORM_FIELD = 'answerIds'
type FormValues = {
  [FORM_FIELD]: string[]
}

export interface MultipleChoiceEditorProps {
  poll: MultipleChoicePollDto | PollDraft
  onSubmit?: (arg: {pollId: string, answerIds: string[]}) => void
}

export const MultipleChoiceEditor = memo(({
  poll,
  onSubmit
}: MultipleChoiceEditorProps) => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      [FORM_FIELD]: []
    }
  })

  const submitSelectedAnswers = useCallback((data: FormValues) => {
    onSubmit?.({
      pollId: poll.id,
      answerIds: data[FORM_FIELD]
    })
  }, [poll.id, onSubmit])

  return (
    <form onSubmit={handleSubmit(submitSelectedAnswers)} className={cls.form}>
      {poll.anonymous && <AnonymousTitle />}
      <Typography bold type={TypographyTypes.BLOCK_TITLE}>{poll.question}</Typography>
      {poll.answers.map((option) => (
        <Controller
          control={control}
          name={FORM_FIELD}
          render={({ field }) => {
            const isChecked = field.value?.includes(option.id) ?? false;
            return (
              <CheckboxInput
                {...field}
                key={option.id}
                selected={isChecked}
                onChange={(checked) => {
                  if (checked) {
                    field.onChange([...field.value, option.id]);
                  } else {
                    field.onChange(field.value?.filter((v) => v !== option.id));
                  }
                }}
              >
                <OptionLabel
                  value={option.value}
                  percentage={0}
                />
              </CheckboxInput>
            )
          }}
          key={option.value}
        />
      ))}
      <Button className="ml-auto" type="submit">Confirm</Button>
    </form>
  )
})

MultipleChoiceEditor.displayName = 'MultipleChoiceEditor'