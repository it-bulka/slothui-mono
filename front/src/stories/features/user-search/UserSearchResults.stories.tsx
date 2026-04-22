import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { UserSearchResults } from '@/features/user-search/ui/UserSearchResults/UserSearchResults'
import type { UserShort } from '@/shared/types'

const mockUsers: UserShort[] = [
  { id: '1', nickname: 'Alice Johnson', username: 'alice_dev', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', nickname: 'Bob Smith', username: 'bob_smith', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', nickname: 'Carol White', username: 'carol_ui', avatarUrl: undefined },
]

const meta: Meta<typeof UserSearchResults> = {
  title: 'Features/user-search/UserSearchResults',
  component: UserSearchResults,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}
export default meta
type Story = StoryObj<typeof UserSearchResults>

export const WithResults: Story = {
  args: { list: mockUsers },
}

export const Empty: Story = {
  args: { list: [] },
}

export const Loading: Story = {
  args: { list: [], isLoading: true },
}
