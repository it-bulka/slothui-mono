import { AuthForm, LoginForm } from '@/features';
import { getForgotPasswordPage, getRegisterPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { LinkBlock } from '@/shared/ui';

const links = [
  { to: getRegisterPage(), label: 'Register' },
  { to: getForgotPasswordPage(), label: 'Forgot Password' },
]
const Login = () => {
  return (
    <AuthForm
      formTitle="Login by email and password"
      oAuthTitle="OR by social media"
      form={<LoginForm />}
      additionalBlock={<LinkBlock links={links} noArrow />}
    />
  )
}

export default Login