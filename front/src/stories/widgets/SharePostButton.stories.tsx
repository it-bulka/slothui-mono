import type { Meta, StoryObj } from '@storybook/react-vite'
import { SharePostButton } from '@/widgets/SharePost/ui/SharePostButton/SharePostButton'

const meta: Meta<typeof SharePostButton> = {
  title: 'Widgets/SharePost/SharePostButton',
  component: SharePostButton,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
}
export default meta
type Story = StoryObj<typeof SharePostButton>

export const Default: Story = {
  args: { onClick: () => {} },
}
