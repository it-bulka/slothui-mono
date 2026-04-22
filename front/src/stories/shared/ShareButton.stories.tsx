import type { Meta, StoryObj } from '@storybook/react-vite'
import { ShareButton } from '@/shared/ui/ShareButton/ui/ShareButton'

const meta: Meta<typeof ShareButton> = {
  title: 'Shared/ShareButton',
  component: ShareButton,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ShareButton>

export const Default: Story = {
  args: { onClick: () => {}, children: '5' },
}

export const NoCount: Story = {
  args: { onClick: () => {} },
}
