import { AuthForm } from '@/features/authUser';
import { ForgotPasswordForm } from '@/features/forgotPassword';
import { useState } from 'react';
import { LinkBlock } from '@/shared/ui/LinkBlock';
import { getLoginPage, getRegisterPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { Helmet } from 'react-helmet-async';

const links = [
  { to: getLoginPage(), label: 'Login' },
  { to: getRegisterPage(), label: 'Register' },
]

const linksForSuccess = [
  { to: getLoginPage(), label: 'Go back to Login' },
]

const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return (
      <>
        <Helmet>
          <title>Forgot password — SlothUI</title>
          <meta name="description" content="Reset your SlothUI password. We'll send a reset link to your email." />
          <meta property="og:title" content="Forgot password — SlothUI" />
          <meta property="og:description" content="Reset your SlothUI password." />
        </Helmet>
        <AuthForm
          formTitle="Check your email for resetting link"
          withOAuth={false}
          form={<LinkBlock links={linksForSuccess} noArrow />}
        />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Forgot password — SlothUI</title>
        <meta name="description" content="Reset your SlothUI password. We'll send a reset link to your email." />
        <meta property="og:title" content="Forgot password — SlothUI" />
        <meta property="og:description" content="Reset your SlothUI password." />
      </Helmet>
      <AuthForm
        formTitle="Enter your email to reset password"
        withOAuth={false}
        form={<ForgotPasswordForm onSuccess={() => setIsSuccess(true)} />}
        additionalBlock={<LinkBlock links={links} noArrow />}
      />
    </>
  )
}

export default ForgotPassword;
