import { useForm, Controller } from 'react-hook-form';
import { useCallback, memo } from 'react';
import { OptionLabel } from '../OptionLabel.tsx';
import { RadioInput, TypographyTypes, Typography } from '@/shared/ui';
import cls from '../common/styles.module.css';
import { AnonymousTitle } from '@/features/PollView/ui/common/AnonymousTitle.tsx';

const FORM_FIELD = 'answerId'

type FormValues = {
  [FORM_FIELD]: number
}

export interface SingleChoiceEditorProps extends Partial<FormValues>{
  question: string
  questionId: string
  options: { value: string }[]
  anonymous?:boolean
}

export const SingleChoiceEditor = memo(({
  question, options, answerId, anonymous
}: SingleChoiceEditorProps) => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      answerId
    }
  })

  const onSubmit = useCallback((data: FormValues) => {
    console.log('single edit poll:', data)
  }, [])
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
      {anonymous && <AnonymousTitle />}
      <Typography bold type={TypographyTypes.BLOCK_TITLE}>{question}</Typography>
      {options.map((option, index) => (
        <Controller
          control={control}
          name={FORM_FIELD}
          render={({ field, formState }) => (
            <RadioInput
              name={field.name}
              key={index}
              onChange={(checked) => {
                if(checked) {
                  field.onChange(index)
                  handleSubmit(onSubmit)()
                }
              }}
              disabled={formState.isSubmitting || formState.isSubmitted}
              selected={field.value === index}
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