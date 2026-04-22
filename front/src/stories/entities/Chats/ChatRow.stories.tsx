import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatRow } from '@/entities/Chats/ui/ChatRow'

const meta: Meta<typeof ChatRow> = {
  title: 'Entities/Chats/ChatRow',
  component: ChatRow,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    messagePreview: { control: 'text' },
    unreadCount: { control: 'number' },
    avatar: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof ChatRow>

export const Default: Story = {
  args: {
    name: 'Alice Johnson',
    messagePreview: 'Hey, how are you?',
    onClick: () => {},
  },
}

export const WithUnread: Story = {
  args: {
    name: 'Bob Smith',
    messagePreview: 'Did you see the news?',
    unreadCount: 5,
    onClick: () => {},
  },
}

export const WithAvatar: Story = {
  args: {
    name: 'Carol White',
    messagePreview: 'See you tomorrow!',
    avatar: 'https://i.pravatar.cc/150?img=3',
    unreadCount: 2,
    onClick: () => {},
  },
}

export const NoPreview: Story = {
  args: {
    name: 'Dave Brown',
    onClick: () => {},
  },
}
