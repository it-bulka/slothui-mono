import type { Meta, StoryObj } from '@storybook/react-vite'
import { CopyButton } from '@/shared/ui/CopyButton/ui/CopyButton'

const meta: Meta<typeof CopyButton> = {
  title: 'Shared/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof CopyButton>

export const Default: Story = {
  args: { textToCopy: 'https://slothui.com/profile/123' },
}
