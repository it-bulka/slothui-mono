import type { Meta, StoryObj } from '@storybook/react-vite'
import { PasswordInput } from '@/shared/ui/PasswordInput/ui/PasswordInput'

const meta: Meta<typeof PasswordInput> = {
  title: 'Shared/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof PasswordInput>

export const Default: Story = {
  args: { placeholder: 'Enter password' },
}

export const WithLabel: Story = {
  args: { label: 'Password', placeholder: 'Min 8 characters' },
}

export const WithError: Story = {
  args: { label: 'Password', error: 'Password is too short' },
}
