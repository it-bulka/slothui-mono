import { AuthForm, LoginForm } from '@/features/authUser';
import { getForgotPasswordPage, getRegisterPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { LinkBlock } from '@/shared/ui/LinkBlock';
import { Helmet } from 'react-helmet-async';

const links = [
  { to: getRegisterPage(), label: 'Register' },
  { to: getForgotPasswordPage(), label: 'Forgot Password' },
]
const Login = () => {
  return (
    <>
      <Helmet><title>Sign in — SlothUI</title></Helmet>
      <AuthForm
        formTitle="Login by email and password"
        oAuthTitle="OR by social media"
        form={<LoginForm />}
        additionalBlock={<LinkBlock links={links} noArrow />}
      />
    </>
  )
}

export default Login