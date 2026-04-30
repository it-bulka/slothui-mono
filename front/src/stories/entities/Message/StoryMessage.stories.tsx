import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryMessage } from '@/entities/Message/ui/content/StoryMessage/StoryMessage'
import type { MessageWithStoryDto } from '@/shared/types/message.dto'

const meta: Meta<typeof StoryMessage> = {
  title: 'Entities/Message/StoryMessage',
  component: StoryMessage,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="max-w-sm p-4 flex flex-col gap-1">
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof StoryMessage>

const baseStoryMsg: MessageWithStoryDto = {
  id: 'msg-story-1',
  chatId: 'chat-1',
  text: '',
  authorId: 'user-2',
  createdAt: new Date().toISOString(),
  story: {
    id: 'story-1',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=500&fit=crop',
    type: 'image',
    duration: null,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 86400000).toISOString(),
    userId: 'user-2',
    user: {
      id: 'user-2',
      username: 'alice_dev',
      nickname: 'Alice Johnson',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
    },
  },
}

export const FromOther: Story = {
  args: {
    msg: baseStoryMsg,
    time: '14:32',
    isAuthor: false,
    isFirst: false,
  },
}

export const FromAuthor: Story = {
  args: {
    msg: baseStoryMsg,
    time: '14:33',
    isAuthor: true,
    isFirst: false,
  },
}

export const WithTextReply: Story = {
  args: {
    msg: { ...baseStoryMsg, text: 'Love this shot!' },
    time: '14:34',
    isAuthor: false,
    isFirst: true,
  },
}

export const VideoStory: Story = {
  args: {
    msg: {
      ...baseStoryMsg,
      story: {
        ...baseStoryMsg.story,
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        type: 'video',
      },
    },
    time: '14:35',
    isAuthor: false,
    isFirst: false,
  },
}
