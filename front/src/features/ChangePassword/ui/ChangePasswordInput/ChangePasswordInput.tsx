import { Controller } from 'react-hook-form'
import { Input } from '@/shared/ui'
import type { Control } from 'react-hook-form'
import type { ChangePasswordFormData } from '../../module'

interface ProfileTextInputProps {
  control: Control<ChangePasswordFormData>
  name: keyof ChangePasswordFormData
  label: string
}

export const ChangePasswordInput = ({ control, name, label }: ProfileTextInputProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field, formState }) => (
      <Input label={label} {...field} error={formState.errors[name]?.message}/>
    )}
  />
)
