import { AuthForm, RegisterForm } from '@/features';
import { LinkBlock } from '@/shared/ui';
import { getForgotPasswordPage, getLoginPage } from '@/shared/config/routeConfig/routeConfig.tsx';

const links = [
  { to: getLoginPage(), label: 'Login' },
  { to: getForgotPasswordPage(), label: 'Forgot Password' },
]

const Register = () => {
  return (
    <AuthForm
      formTitle="Register by email and password"
      oAuthTitle="OR by social media"
      form={<RegisterForm />}
      additionalBlock={<LinkBlock links={links} noArrow />}
    />
  )
}

export default Register