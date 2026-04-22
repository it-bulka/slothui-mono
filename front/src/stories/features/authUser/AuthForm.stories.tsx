import type { Meta, StoryObj } from '@storybook/react-vite'
import { AuthForm } from '@/features/authUser/ui/AuthForm'

const meta: Meta<typeof AuthForm> = {
  title: 'Features/authUser/AuthForm',
  component: AuthForm,
  tags: ['autodocs'],
  argTypes: {
    withOAuth: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof AuthForm>

export const Login: Story = {
  args: {
    formTitle: 'Sign In',
    form: (
      <div className="flex flex-col gap-3">
        <input className="input" placeholder="Email" />
        <input className="input" type="password" placeholder="Password" />
        <button className="btn-primary w-full">Sign In</button>
      </div>
    ),
    withOAuth: true,
  },
}

export const Register: Story = {
  args: {
    formTitle: 'Create Account',
    form: (
      <div className="flex flex-col gap-3">
        <input className="input" placeholder="Username" />
        <input className="input" placeholder="Email" />
        <input className="input" type="password" placeholder="Password" />
        <button className="btn-primary w-full">Register</button>
      </div>
    ),
    withOAuth: false,
  },
}

export const WithAdditionalBlock: Story = {
  args: {
    formTitle: 'Sign In',
    form: <button className="btn-primary w-full">Sign In</button>,
    withOAuth: false,
    additionalBlock: (
      <p className="text-center text-sm mt-2">
        Don't have an account? <a href="#" className="text-blue-500">Sign up</a>
      </p>
    ),
  },
}
