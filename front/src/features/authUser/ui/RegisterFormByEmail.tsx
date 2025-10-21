import { Button, FileInput, Input } from '@/shared/ui';
import { registerSchema, type RegisterFormData } from '../model/validation-register.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useAuthService } from '@/shared/libs/services';
import { useCallback } from 'react';

const inputs = [
  { name: 'username', placeholder: 'Username' },
  { name: 'email', placeholder: '@my_email@gmail.com' },
  { name: 'nickname', placeholder: 'nickname' },
  { name: 'password', placeholder: 'password' },
  { name: 'confirmPassword', placeholder: 'password' },
] as const

export const RegisterForm = () => {
  const { handleSubmit, control } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })
  const authService = useAuthService();

  const onSubmit = useCallback(async (data: RegisterFormData) => {
    console.log('Form data:', data);
    // TODO: add Avatar sending
    await authService.registerByPassword({
      name: data.username,
      email: data.email,
      password: data.password,
    })
  }, [authService]);

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="avatar"
        render={({ field }) => (
          <FileInput title="upload avatar" {...field}/>
        )}
      />
      {inputs.map(({ name, placeholder }) => (
        <Controller
          key={name}
          control={control}
          name={name}
          render={({ field }) => (
            <Input placeholder={placeholder} {...field}/>
          )}
        />
      ))}
      <Button type="submit" className="min-w-[50%] ml-auto">
        Submit
      </Button>
    </form>
  )
}