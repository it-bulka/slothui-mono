import type { Meta, StoryObj } from '@storybook/react-vite'
import { Error } from '@/shared/ui/Error/ui/Error'

const meta: Meta<typeof Error> = {
  title: 'Shared/Error',
  component: Error,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Error>

export const Default: Story = {
  args: { text: 'Something went wrong. Please try again.' },
}

export const Short: Story = {
  args: { text: 'Not found.' },
}
