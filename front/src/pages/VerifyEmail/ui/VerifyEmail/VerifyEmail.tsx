import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { AuthForm } from '@/features';
import { LinkBlock } from '@/shared/ui';
import { getLoginPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { useAuthService } from '@/shared/libs/services';

type Status = 'loading' | 'success' | 'error';

const loginLinks = [{ to: getLoginPage(), label: 'Go to Login' }];

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

  if (status === 'loading') {
    return (
      <AuthForm
        formTitle="Verifying your email…"
        withOAuth={false}
        form={null}
      />
    );
  }

  if (status === 'success') {
    return (
      <AuthForm
        formTitle="Email verified!"
        withOAuth={false}
        form={null}
        additionalBlock={<LinkBlock links={loginLinks} noArrow />}
      />
    );
  }

  return (
    <AuthForm
      formTitle="Link is invalid or expired"
      withOAuth={false}
      form={null}
      additionalBlock={<LinkBlock links={loginLinks} noArrow />}
    />
  );
};

export default VerifyEmail;
