import { Button } from '@/shared/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../model/validation-login.ts';
import { useCallback } from 'react';
import { loginUser } from '@/entities/AuthUser';
import { useAppDispatch } from '@/shared/config/redux';
import { AuthInput } from './AuthInput.tsx';
import { useNavigate } from 'react-router';
import { getHomePage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { useUpdateToken } from '@/shared/libs/services';

const inputs = [
  { name: 'email', placeholder: '@my_email@gmail.com' },
  { name: 'password', placeholder: 'password' },
] as const

export const LoginForm = () => {
  const { handleSubmit, control } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const updateToken = useUpdateToken()

  const onSubmit = useCallback(async (data: LoginFormData) => {
    dispatch(loginUser(data))
      .unwrap()
      .then(res => {
        updateToken(res.token)
        navigate(getHomePage())
      })
  }, [dispatch, navigate, updateToken])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2"
    >
      {inputs.map(({ name, placeholder }) => (
        <AuthInput<LoginFormData>
          key={name}
          name={name}
          label={name}
          placeholder={placeholder}
          control={control}
        />
      ))}
      <Button type="submit" className="min-w-[50%] ml-auto">
        Submit
      </Button>
    </form>
  )
}