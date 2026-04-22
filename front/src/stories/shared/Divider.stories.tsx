import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider } from '@/shared/ui/Divider/Divider'

const meta: Meta<typeof Divider> = {
  title: 'Shared/Divider',
  component: Divider,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Divider>

export const Default: Story = {}

export const Custom: Story = {
  args: { className: 'bg-blue-b1 h-[2px]' },
}
