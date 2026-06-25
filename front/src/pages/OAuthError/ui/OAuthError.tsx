import { useSearchParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { AuthForm } from '@/features/authUser';
import { Typography } from '@/shared/ui/Typography/Typography';
import { LinkBlock } from '@/shared/ui/LinkBlock';
import { getLoginPage } from '@/shared/config/routeConfig/routeConfig.tsx';

const links = [{ to: getLoginPage(), label: 'Back to Login' }];

const OAuthError = () => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('oauthError') ?? 'An unexpected error occurred during authentication.';

  return (
    <>
      <Helmet>
        <title>Authentication Error — SlothUI</title>
        <meta name="description" content="An error occurred during authentication. Please try again." />
        <meta property="og:title" content="Authentication Error — SlothUI" />
        <meta property="og:description" content="An error occurred during authentication. Please try again." />
      </Helmet>
      <AuthForm
        formTitle="Authentication Failed"
        withOAuth={false}
        form={
          <Typography className="text-center" color="error" role="alert" aria-live="polite">
            {error}
          </Typography>
        }
        additionalBlock={<LinkBlock links={links} noArrow />}
      />
    </>
  );
};

export default OAuthError;
