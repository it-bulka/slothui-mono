import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { FriendsList } from '@/features/friends/ui/FriendsList/FriendsList'
import type { FriendEntity } from '@/entities'

const mockFriends: FriendEntity[] = [
  { id: '1', username: 'alice_dev', nickname: 'Alice Johnson', src: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', username: 'bob_smith', nickname: 'Bob Smith', src: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', username: 'carol_ui', nickname: 'Carol White', src: undefined },
]

const meta: Meta<typeof FriendsList> = {
  title: 'Features/friends/FriendsList',
  component: FriendsList,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}
export default meta
type Story = StoryObj<typeof FriendsList>

export const Default: Story = {
  args: { friends: mockFriends },
}

export const WithNewFollowers: Story = {
  args: {
    friends: mockFriends,
    newFollowerIds: ['2'],
  },
}

export const WithActions: Story = {
  args: {
    friends: mockFriends,
    renderActions: () => (
      <button className="btn-soft text-sm">Follow</button>
    ),
  },
}

export const Empty: Story = {
  args: { friends: [] },
}
