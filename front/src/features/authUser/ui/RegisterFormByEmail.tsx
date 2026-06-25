import { memo, useCallback } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { FileInput } from '@/shared/ui/FileIput/FileInput';
import { registerSchema, type RegisterFormData } from '../model/validation-register.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useRegisterUser } from '@/entities/AuthUser';
import { AuthInput } from '@/features/authUser/ui/AuthInput.tsx';

const inputs = [
  { name: 'username', label: 'Username', placeholder: 'Username', type: 'text' },
  { name: 'email', label: 'Email', placeholder: 'your@email.com', type: 'text' },
  { name: 'nickname', label: 'Nickname', placeholder: 'Nickname', type: 'text' },
  { name: 'password', label: 'Password', placeholder: 'Password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm password', placeholder: 'Confirm password', type: 'password' },
] as const

export const RegisterForm = memo(({ onSuccess }: { onSuccess?: () => void }) => {
  const { registerUser } = useRegisterUser()

  const { handleSubmit, control, formState: { isSubmitting, errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = useCallback(async (data: RegisterFormData) => {
    registerUser({
      username: data.username,
      email: data.email,
      password: data.password,
      nickname: data.nickname,
      avatar: data.avatar,
    }).unwrap()
      .then(() => {
        onSuccess?.();
      })
  }, [registerUser, onSuccess]);

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="avatar"
        render={({ field }) => {
          const { ref: _r, ...restField } = field
          return (
            <FileInput
              title="upload avatar"
              {...restField}
              onChange={(files) => field.onChange(files)}
              error={errors[field.name]?.message}
              className="w-full"
            />
          )
        }}
      />

      {inputs.map(({ name, label, placeholder, type }) => (
        <AuthInput<RegisterFormData>
          key={name}
          name={name}
          label={label}
          placeholder={placeholder}
          control={control}
          type={type}
        />
      ))}

      <Button type="submit" className="min-w-[50%] ml-auto" disabled={isSubmitting}>
        Create account
      </Button>
    </form>
  )
})

RegisterForm.displayName = 'RegisterForm'
