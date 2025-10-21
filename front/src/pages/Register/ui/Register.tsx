import { AuthForm, RegisterForm } from '@/features';

const Register = () => {
  return (
    <AuthForm
      formTitle="Register by email and password"
      oAuthTitle="OR by social media"
      form={<RegisterForm />}
    />
  )
}

export default Register