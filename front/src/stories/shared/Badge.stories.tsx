import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '@/shared/ui/Badge/Badge'

const meta: Meta<typeof Badge> = {
  title: 'Shared/Badge',
  component: Badge,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: { children: 'Label' },
}

export const Custom: Story = {
  args: { children: 'Custom', className: 'text-green-g1 bg-transparent border-green-g1' },
}
