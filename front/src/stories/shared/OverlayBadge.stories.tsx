import type { Meta, StoryObj } from '@storybook/react-vite'
import { OverlayBadge } from '@/shared/ui/OverlayBadge/OverlayBadge'
import { Bell } from 'lucide-react'

const meta: Meta<typeof OverlayBadge> = {
  title: 'Shared/OverlayBadge',
  component: OverlayBadge,
  tags: ['autodocs'],
  argTypes: {
    show: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof OverlayBadge>

export const WithCount: Story = {
  render: () => (
    <OverlayBadge content={3}>
      <Bell size={24} />
    </OverlayBadge>
  ),
}

export const Hidden: Story = {
  render: () => (
    <OverlayBadge content={3} show={false}>
      <Bell size={24} />
    </OverlayBadge>
  ),
}

export const LargeCount: Story = {
  render: () => (
    <OverlayBadge content="99+">
      <Bell size={24} />
    </OverlayBadge>
  ),
}
