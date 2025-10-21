import { SocialBtnsOauth } from '@/features';
import { Typography, TypographyTypes } from '@/shared/ui';
import type { ReactNode } from 'react';
import { useUserErrorSelector, useUserLoadingSelector } from '@/entities/User';
import { twMerge } from 'tailwind-merge';
import classnames from 'classnames';

interface AuthFormProps {
  formTitle: string;
  form: ReactNode
  oAuthTitle: string;
}

export const AuthForm = ({
  formTitle,
  oAuthTitle,
  form,
}: AuthFormProps) => {
  const error = useUserErrorSelector()
  const isLoading = useUserLoadingSelector()
  console.log('Auth error', error)
  return (
    <div className={twMerge(classnames("max-w-1/3 min-w-[300px] flex flex-col gap-2 p-10 bg-auth-form mx-auto", {'opacity-20 pointer-none:': isLoading}))}>
      <Typography className="text-center" bold type={TypographyTypes.TITLE} variant="h1">
        {formTitle}
      </Typography>
      {form}
      {error && <Typography color='error'>{error}</Typography>}
      <Typography className="my-4 text-center" bold type={TypographyTypes.SUBTITLE} variant="h4">
        {oAuthTitle}
      </Typography>
      <SocialBtnsOauth />
    </div>
  )
}