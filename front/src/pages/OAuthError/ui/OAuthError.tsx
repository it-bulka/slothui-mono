import { useSearchParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { Typography } from '@/shared/ui/Typography/Typography';
import { TypographyTypes } from '@/shared/ui/Typography/typography.types';
import { LinkBlock } from '@/shared/ui/LinkBlock';
import { getLoginPage } from '@/shared/config/routeConfig/routeConfig.tsx';

const links = [{ to: getLoginPage(), label: 'Back to Login' }];

const OAuthError = () => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('oauthError') ?? 'An unexpected error occurred during authentication.';

  return (
    <>
      <Helmet><title>Authentication Error — SlothUI</title></Helmet>
      <div className="md:max-w-1/3 max-w-[80%] min-w-[300px] flex flex-col gap-4 p-10 bg-auth-form mx-auto">
        <Typography className="text-center" bold type={TypographyTypes.TITLE} variant="h1">
          Authentication Failed
        </Typography>
        <Typography className="text-center" color="error">
          {error}
        </Typography>
        <LinkBlock links={links} noArrow />
      </div>
    </>
  );
};

export default OAuthError;
