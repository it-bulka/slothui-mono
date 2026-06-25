import { useSearchParams } from 'react-router';
import { AuthForm } from '@/features/authUser';
import { ResetPasswordForm } from '@/features/ResetPassword';
import { getLoginPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { useState } from 'react';
import { ReplaceLink } from '../ReplaceLink/ReplaceLink.tsx';
import { Helmet } from 'react-helmet-async';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return (
      <>
        <Helmet>
          <title>Reset password — SlothUI</title>
          <meta name="description" content="Set a new password for your SlothUI account." />
          <meta property="og:title" content="Reset password — SlothUI" />
          <meta property="og:description" content="Set a new password for your SlothUI account." />
        </Helmet>
        <AuthForm
          formTitle="Password successfully changed"
          withOAuth={false}
          form={null}
          additionalBlock={(
            <div>
              <ReplaceLink to={getLoginPage()}>Go back to Login</ReplaceLink>
            </div>
          )}
        />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Reset password — SlothUI</title>
        <meta name="description" content="Set a new password for your SlothUI account." />
        <meta property="og:title" content="Reset password — SlothUI" />
        <meta property="og:description" content="Set a new password for your SlothUI account." />
      </Helmet>
      <AuthForm
        formTitle="Set new password"
        withOAuth={false}
        form={<ResetPasswordForm token={token} onSuccess={() => setIsSuccess(true)} />}
      />
    </>
  )
}

export default ResetPassword
