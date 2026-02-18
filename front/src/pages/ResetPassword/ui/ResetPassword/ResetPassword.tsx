import { useSearchParams } from 'react-router';
import { AuthForm, ResetPasswordForm } from '@/features';
import { getLoginPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { useState } from 'react';
import { ReplaceLink } from '../ReplaceLink/ReplaceLink.tsx';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [isSuccess, setIsSuccess] = useState(false);

  if(isSuccess){
    return (
      <AuthForm
        formTitle={"Password successfully changed"}
        withOAuth={false}
        form={null}
        additionalBlock={(
          <div>
            <ReplaceLink to={getLoginPage()}>Go back to Login</ReplaceLink>
          </div>
        )}
      />
    )
  }

  return (
    <AuthForm
      formTitle="Put new password"
      withOAuth={false}
      form={<ResetPasswordForm token={token} onSuccess={() => setIsSuccess(true)}/>}
    />
  )
}

export default ResetPassword