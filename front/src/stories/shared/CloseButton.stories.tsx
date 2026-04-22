import type { Meta, StoryObj } from '@storybook/react-vite'
import { CloseButton } from '@/shared/ui/CloseButton/ui/CloseButton/CloseButton'

const meta: Meta<typeof CloseButton> = {
  title: 'Shared/CloseButton',
  component: CloseButton,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof CloseButton>

export const Default: Story = {
  args: { onClick: () => {} },
}
