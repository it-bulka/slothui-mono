import { Controller } from 'react-hook-form'
import { Input } from '@/shared/ui'
import type { Control } from 'react-hook-form'
import type { ProfileFormValues } from '../../model'

interface ProfileTextInputProps {
  control: Control<ProfileFormValues>
  name: keyof Pick<ProfileFormValues, 'username' | 'nickname' | 'bio'>
  label: string
}

export const ProfileTextInput = ({ control, name, label }: ProfileTextInputProps) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => <Input label={label} {...field} />}
  />
)
