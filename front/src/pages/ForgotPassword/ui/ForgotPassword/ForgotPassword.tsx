import { AuthForm, ForgotPasswordForm } from '@/features';
import { useState } from 'react';
import { LinkBlock } from '@/shared/ui';
import { getLoginPage, getRegisterPage } from '@/shared/config/routeConfig/routeConfig.tsx';

const links = [
  { to: getLoginPage(), label: 'Login' },
  { to: getRegisterPage(), label: 'Register' },
]

const linksForSuccess = [
  { to: getLoginPage(), label: 'Go back to Login' },
]

const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  if(isSuccess){
    return (
      <AuthForm
        formTitle={"Check your email for resetting link"}
        withOAuth={false}
        form={<LinkBlock links={linksForSuccess} noArrow />}
      />
    )
  }
  return (
    <AuthForm
      formTitle={"Put email to reset password"}
      withOAuth={false}
      form={ <ForgotPasswordForm onSuccess={() => setIsSuccess(true)} />}
      additionalBlock={<LinkBlock links={links} noArrow />}
    />
  )
}

export default ForgotPassword;