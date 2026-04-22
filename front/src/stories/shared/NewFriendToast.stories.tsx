import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewFriendToast } from '@/shared/ui/NewFriendToast/ui/NewFriendToast'
import { MemoryRouter } from 'react-router'

const meta: Meta<typeof NewFriendToast> = {
  title: 'Shared/Toast/NewFriendToast',
  component: NewFriendToast,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}
export default meta
type Story = StoryObj<typeof NewFriendToast>

export const Default: Story = {
  args: {
    friend: {
      id: 'user-1',
      nickname: 'jane_doe',
      username: 'Jane Doe',
      avatarSrc: 'https://i.pravatar.cc/150?img=5',
    },
  },
}

export const NoAvatar: Story = {
  args: {
    friend: {
      id: 'user-2',
      nickname: 'john_smith',
      username: 'John Smith',
      avatarSrc: null,
    },
  },
}
