import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { PostMessage } from '@/entities/Message/ui/content/PostMessage/PostMessage'
import type { MessageWithPostDto } from '@/shared/types/message.dto'

const meta: Meta<typeof PostMessage> = {
  title: 'Entities/Message/PostMessage',
  component: PostMessage,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}
export default meta
type Story = StoryObj<typeof PostMessage>

const base: MessageWithPostDto = {
  id: 'msg-1',
  chatId: 'chat-1',
  text: '',
  authorId: 'user-1',
  createdAt: new Date().toISOString(),
  post: {
    id: 'post-1',
    authorId: 'user-2',
    authorName: 'alice_dev',
    createdAt: new Date().toISOString(),
    text: 'Just shipped a new feature — dynamic forms with Zod + React Hook Form. Check it out!',
    mediaCount: 0,
    fileCount: 0,
    audioCount: 0,
  },
}

export const TextOnly: Story = {
  args: { msg: base, time: '14:32', isAuthor: false, isFirst: false },
}

export const WithCover: Story = {
  args: {
    msg: {
      ...base,
      post: {
        ...base.post,
        coverUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=400&h=140&fit=crop',
        text: undefined,
        mediaCount: 2,
      },
    },
    time: '14:35',
    isAuthor: true,
    isFirst: false,
  },
}

export const DeletedPost: Story = {
  args: {
    msg: { ...base, post: null as unknown as MessageWithPostDto['post'] },
    time: '14:36',
    isAuthor: false,
    isFirst: false,
  },
}
