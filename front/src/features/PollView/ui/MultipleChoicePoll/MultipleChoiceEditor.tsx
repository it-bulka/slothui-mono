import { useForm, Controller } from 'react-hook-form';
import { useCallback, memo } from 'react';
import { CheckboxInput, Typography, TypographyTypes, Button } from '@/shared/ui';
import { OptionLabel } from '@/features/PollView/ui/OptionLabel.tsx';
import cls from '../common/styles.module.css'
import { AnonymousTitle } from '@/features/PollView/ui/common/AnonymousTitle.tsx';

type FormValues = {
  answersIndex: number[]
}

export interface MultipleChoiceEditorProps extends Partial<FormValues>{
  question: string
  questionId: string
  options: { value: string }[]
  anonymous?: boolean
}

export const MultipleChoiceEditor = memo(({
  question, questionId, options, anonymous
}: MultipleChoiceEditorProps) => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      answersIndex: []
    }
  })

  const onSubmit = useCallback((data: FormValues) => {
    const chosen = data.answersIndex.map(index => ({
      value: options[index].value,
      order: index,
      questionId: questionId
    }))

    //TODO: POST
    console.log('chosen', chosen)
  }, [options, questionId])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
      {anonymous && <AnonymousTitle />}
      <Typography bold type={TypographyTypes.BLOCK_TITLE}>{question}</Typography>
      {options.map((option, index) => (
        <Controller
          control={control}
          name={'answersIndex'}
          render={({ field }) => {
            const isChecked = field.value?.includes(index) ?? false;
            return (
              <CheckboxInput
                {...field}
                key={index}
                selected={isChecked}
                onChange={(checked) => {
                  if (checked) {
                    field.onChange([...field.value, index]);
                  } else {
                    field.onChange(field.value?.filter((v: number) => v !== index));
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