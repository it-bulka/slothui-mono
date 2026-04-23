import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserProfileData } from '@/widgets/UserRightSidebar/ui/UserProfileData/UserProfileData'

const meta: Meta<typeof UserProfileData> = {
  title: 'Widgets/UserRightSidebar/UserProfileData',
  component: UserProfileData,
  tags: ['autodocs'],
  argTypes: {
    username: { control: 'text' },
    nickname: { control: 'text' },
    avatarSrc: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof UserProfileData>

export const Default: Story = {
  args: {
    username: 'john_doe',
    nickname: 'John Doe',
    avatarSrc: 'https://i.pravatar.cc/150?img=10',
  },
}

export const NoAvatar: Story = {
  args: {
    username: 'jane_smith',
    nickname: 'Jane Smith',
    avatarSrc: null,
  },
}

export const LongNames: Story = {
  args: {
    username: 'very_long_username_here',
    nickname: 'Very Long Display Name That May Wrap',
    avatarSrc: 'https://i.pravatar.cc/150?img=15',
  },
}
