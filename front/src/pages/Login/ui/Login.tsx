import { AuthForm, LoginForm } from '@/features';

const Login = () => {

  return (
    <AuthForm
      formTitle="Login by email and password"
      oAuthTitle="OR by social media"
      form={<LoginForm />}
    />
  )
}

export default Login