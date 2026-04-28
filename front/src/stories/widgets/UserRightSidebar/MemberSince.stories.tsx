import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemberSince } from '@/widgets/UserRightSidebar/ui/MemberSince'

const meta: Meta<typeof MemberSince> = {
  title: 'Widgets/UserRightSidebar/MemberSince',
  component: MemberSince,
  tags: ['autodocs'],
  argTypes: {
    createdAt: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof MemberSince>

export const Default: Story = {
  args: { createdAt: '2024-05-10T00:00:00.000Z' },
}

export const RecentMember: Story = {
  args: { createdAt: new Date().toISOString() },
}

export const OldMember: Story = {
  args: { createdAt: '2021-01-15T00:00:00.000Z' },
}
