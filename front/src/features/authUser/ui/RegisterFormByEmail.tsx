import { Button, FileInput } from '@/shared/ui';
import { registerSchema, type RegisterFormData } from '../model/validation-register.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useCallback } from 'react';
import { useRegisterUser } from '@/entities';
import { AuthInput } from '@/features/authUser/ui/AuthInput.tsx';

const inputs = [
  { name: 'username', placeholder: 'Username', type: 'text' },
  { name: 'email', placeholder: '@my_email@gmail.com', type: 'text' },
  { name: 'nickname', placeholder: 'nickname', type: 'text' },
  { name: 'password', placeholder: 'password', type: 'password' },
  { name: 'confirmPassword', placeholder: 'password', type: 'password' },
] as const

export const RegisterForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { registerUser } = useRegisterUser()

  const { handleSubmit, control, formState } = useForm<RegisterFormData>({
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
              error={formState.errors[field.name]?.message}
              className={"w-full"}
            />
          )
        }}
      />

      {inputs.map(({ name, placeholder, type }) => (
        <AuthInput<RegisterFormData>
          key={name}
          name={name}
          label={name}
          placeholder={placeholder}
          control={control}
          type={type}
        />
      ))}

      <Button type="submit" className="min-w-[50%] ml-auto">
        Submit
      </Button>
    </form>
  )
}