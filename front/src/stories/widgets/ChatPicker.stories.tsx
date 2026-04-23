import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatPicker } from '@/widgets/ChatPicker/ui/ChatPicker/ChatPicker'
import { withReduxStore } from './_storyHelpers'

const mockChats = {
  ids: ['chat-1', 'chat-2', 'chat-3'],
  entities: {
    'chat-1': {
      id: 'chat-1',
      name: 'Team Alpha',
      avatarUrl: 'https://i.pravatar.cc/150?img=10',
      anotherMember: undefined,
      isMember: true,
      updatedAt: '2025-01-01T00:00:00Z',
      lastMessage: { id: 'msg-1', text: 'Last message', createdAt: '2025-01-01T00:00:00Z' },
    },
    'chat-2': {
      id: 'chat-2',
      name: '',
      avatarUrl: undefined,
      anotherMember: { id: 'u-1', nickname: 'Alice Johnson', username: 'alice', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
      isMember: true,
      updatedAt: '2025-01-01T00:00:00Z',
      lastMessage: { id: 'msg-2', text: 'Hey!', createdAt: '2025-01-01T00:00:00Z' },
    },
    'chat-3': {
      id: 'chat-3',
      name: '',
      avatarUrl: undefined,
      anotherMember: { id: 'u-2', nickname: 'Bob Smith', username: 'bob', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
      isMember: true,
      updatedAt: '2025-01-01T00:00:00Z',
      lastMessage: { id: 'msg-3', text: 'See you!', createdAt: '2025-01-01T00:00:00Z' },
    },
  },
  activeChatId: null,
  hasMore: false,
  isLoading: false,
  searchResults: [],
  needsRefetch: false,
}

const meta: Meta<typeof ChatPicker> = {
  title: 'Widgets/ChatPicker',
  component: ChatPicker,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ChatPicker>

export const WithChats: Story = {
  decorators: [withReduxStore({ chats: mockChats as never })],
  args: { onSelect: (id) => alert(`Selected: ${id}`) },
}

export const Loading: Story = {
  decorators: [
    withReduxStore({
      chats: { ids: [], entities: {}, activeChatId: null, hasMore: false, isLoading: true, searchResults: [], needsRefetch: false } as never,
    }),
  ],
  args: { onSelect: () => {} },
}

export const Empty: Story = {
  decorators: [
    withReduxStore({
      chats: { ids: [], entities: {}, activeChatId: null, hasMore: false, isLoading: false, searchResults: [], needsRefetch: false } as never,
    }),
  ],
  args: { onSelect: () => {} },
}
