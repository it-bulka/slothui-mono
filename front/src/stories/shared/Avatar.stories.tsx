import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { AvatarWithInfo } from '@/shared/ui/Avatar/AvatarWithInfo'
import { AvatarWithStatus } from '@/shared/ui/Avatar/AvatarWithStatus'

const meta: Meta<typeof Avatar> = {
  title: 'Shared/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
}
export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: { name: 'John Doe', size: 'md' },
}

export const WithPhoto: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    name: 'Jane Smith',
    size: 'lg',
  },
}

export const Small: Story = { args: { name: 'User', size: 'sm' } }
export const Medium: Story = { args: { name: 'User', size: 'md' } }
export const Large: Story = { args: { name: 'User', size: 'lg' } }

export const WithInfo: StoryObj<typeof AvatarWithInfo> = {
  render: () => (
    <AvatarWithInfo
      src="https://i.pravatar.cc/150?img=5"
      name="Jane Smith"
      position="Frontend Developer"
    />
  ),
}

export const OnlineStatus: StoryObj<typeof AvatarWithStatus> = {
  render: () => (
    <div className="flex gap-4">
      <AvatarWithStatus src="https://i.pravatar.cc/150?img=7" name="Online" isOnline />
      <AvatarWithStatus src="https://i.pravatar.cc/150?img=8" name="Offline" isOnline={false} />
    </div>
  ),
}
