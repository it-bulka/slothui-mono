import { Controller } from 'react-hook-form'
import { Input } from '@/shared/ui'
import type { Control } from 'react-hook-form'
import type { ResetPasswordFormData } from '../../model';

interface ProfileTextInputProps {
  control: Control<ResetPasswordFormData>
  name: keyof ResetPasswordFormData
  label: string
}

export const ResetPasswordInput = ({ control, name, label }: ProfileTextInputProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field, formState }) => (
      <Input label={label} {...field} error={formState.errors[name]?.message}/>
    )}
  />
)
