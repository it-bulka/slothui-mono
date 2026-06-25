import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { AuthForm } from '@/features/authUser';
import { LinkBlock } from '@/shared/ui/LinkBlock';
import { getLoginPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { useAuthService } from '@/shared/libs/services';
import { Helmet } from 'react-helmet-async';

type Status = 'loading' | 'success' | 'error';

const loginLinks = [{ to: getLoginPage(), label: 'Go to Login' }];

const TITLES: Record<Status, string> = {
  loading: 'Verifying your email…',
  success: 'Email verified!',
  error: 'Link is invalid or expired',
}

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<Status>('loading');
  const authService = useAuthService();

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }
    authService
      .verifyEmail({ token })
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Verify email — SlothUI</title>
        <meta name="description" content="Verify your email address to complete SlothUI registration." />
        <meta property="og:title" content="Verify email — SlothUI" />
        <meta property="og:description" content="Verify your email address to complete SlothUI registration." />
      </Helmet>
      <AuthForm
        formTitle={TITLES[status]}
        withOAuth={false}
        form={null}
        additionalBlock={status !== 'loading' ? <LinkBlock links={loginLinks} noArrow /> : null}
      />
    </>
  );
};

export default VerifyEmail;
