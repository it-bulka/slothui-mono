import type { Meta, StoryObj } from '@storybook/react-vite'
import { ShareDrawer } from '@/widgets/ShareDrawer/ui/ShareDrawer/ShareDrawer'
import { ServiceProvider } from '@/shared/libs/services/context/service.provider'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { makeStoryStore } from './_storyHelpers'

const mockChats = [
  { id: 'chat-1', name: 'Team Alpha', avatarUrl: 'https://i.pravatar.cc/150?img=10', anotherMember: null },
  { id: 'chat-2', name: null, avatarUrl: null, anotherMember: { nickname: 'Alice', username: 'alice', avatarUrl: 'https://i.pravatar.cc/150?img=1' } },
]

const withServicesAndStore = (Story: () => ReactNode) => (
  <Provider store={makeStoryStore({ chats: { list: mockChats, isLoading: false } as never })}>
    <ServiceProvider>
      <Story />
    </ServiceProvider>
  </Provider>
)

const meta: Meta<typeof ShareDrawer> = {
  title: 'Widgets/ShareDrawer',
  component: ShareDrawer,
  tags: ['autodocs'],
  decorators: [withServicesAndStore],
}
export default meta
type Story = StoryObj<typeof ShareDrawer>

export const SharePost: Story = {
  args: {
    payload: { type: 'post', postId: 'post-1' },
    isOpen: true,
    onClose: () => {},
  },
}

export const ShareEvent: Story = {
  args: {
    payload: { type: 'event', eventId: 'event-1' },
    isOpen: true,
    onClose: () => {},
  },
}

export const Closed: Story = {
  args: {
    payload: { type: 'post', postId: 'post-1' },
    isOpen: false,
    onClose: () => {},
  },
}
