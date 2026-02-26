import { Input, PasswordInput } from '@/shared/ui';
import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';

interface AuthInputProps<T extends FieldValues = FieldValues>  {
  name: Path<T>;
  placeholder: string;
  label: string;
  control: Control<T>;
  type?: 'password' | 'text';
}

export const AuthInput = <T extends FieldValues>({ name, placeholder, label, control, type }: AuthInputProps<T>) => {
  const Component = (type && type === 'password') ? PasswordInput : Input
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Component
          key={field.name}
          label={label}
          placeholder={placeholder}
          labelClass='bg-gradient-to-b from-auth-form via-auth-form to-white rounded-tl-s rounded-br-none rounded-tr-none rounded-bl-s'
          {...field} error={fieldState.error?.message}
        />
      )}
    />
  )
}