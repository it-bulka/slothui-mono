import { memo, type ReactNode } from 'react';
import { SocialBtnsOauth } from './SocialBtnsOauth.tsx';
import { Typography } from '@/shared/ui/Typography/Typography';
import { TypographyTypes } from '@/shared/ui/Typography/typography.types';
import { useAuthUserErrorSelector, useAuthUserLoadingSelector } from '@/entities/AuthUser';
import { twMerge } from 'tailwind-merge';
import classnames from 'classnames';

interface AuthFormProps {
  formTitle: string;
  form: ReactNode
  oAuthTitle?: string;
  withOAuth?: boolean;
  additionalBlock?: ReactNode;
}

export const AuthForm = memo(({
  formTitle,
  oAuthTitle,
  form,
  withOAuth = true,
  additionalBlock
}: AuthFormProps) => {
  const error = useAuthUserErrorSelector()
  const isLoading = useAuthUserLoadingSelector()

  return (
    <section
      aria-labelledby="auth-form-title"
      className={twMerge(classnames("md:max-w-1/3 max-w-[80%] min-w-[300px] flex flex-col gap-2 px-4 py-10 md:p-10 bg-auth-form mx-auto", { 'opacity-20 pointer-events-none': isLoading }))}
    >
      <Typography id="auth-form-title" className="text-center" bold type={TypographyTypes.TITLE} variant="h1">
        {formTitle}
      </Typography>
      {form}
      {error && (
        <Typography color="error" role="alert" aria-live="polite">
          {error}
        </Typography>
      )}
      {withOAuth && (
        <>
          <Typography className="my-4 text-center" bold type={TypographyTypes.SUBTITLE} variant="h2">
            {oAuthTitle || 'OR by social media'}
          </Typography>
          <SocialBtnsOauth />
        </>
      )}
      {additionalBlock || null}
    </section>
  )
})

AuthForm.displayName = 'AuthForm'
