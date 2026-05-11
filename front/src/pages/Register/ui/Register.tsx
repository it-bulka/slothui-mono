import { useState } from 'react';
import { AuthForm, RegisterForm } from '@/features';
import { LinkBlock } from '@/shared/ui';
import { getForgotPasswordPage, getLoginPage } from '@/shared/config/routeConfig/routeConfig.tsx';

const links = [
  { to: getLoginPage(), label: 'Login' },
  { to: getForgotPasswordPage(), label: 'Forgot Password' },
]

const successLinks = [
  { to: getLoginPage(), label: 'Go to Login' },
]

const Register = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return (
      <AuthForm
        formTitle="Check your email"
        withOAuth={false}
        form={null}
        additionalBlock={
          <>
            <p className="text-center text-sm text-gray-g2">
              We sent a verification link to your email address.
            </p>
            <LinkBlock links={successLinks} noArrow />
          </>
        }
      />
    );
  }

  return (
    <AuthForm
      formTitle="Register by email and password"
      oAuthTitle="OR by social media"
      form={<RegisterForm onSuccess={() => setIsSuccess(true)} />}
      additionalBlock={<LinkBlock links={links} noArrow />}
    />
  );
}

export default Register