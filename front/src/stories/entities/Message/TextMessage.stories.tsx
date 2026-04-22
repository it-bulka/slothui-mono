import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextMessage } from '@/entities/Message/ui/content/TextMessage/TextMessage'
import type { MessageBaseDto } from '@/shared/types/message.dto'

const meta: Meta<typeof TextMessage> = {
  title: 'Entities/Message/TextMessage',
  component: TextMessage,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof TextMessage>

const baseMsg: MessageBaseDto = {
  id: 'msg-1',
  chatId: 'chat-1',
  text: 'Hey! How are you doing?',
  authorId: 'user-1',
  createdAt: new Date().toISOString(),
}

export const FromOther: Story = {
  args: {
    msg: baseMsg,
    time: '14:32',
    isAuthor: false,
    isFirst: false,
  },
}

export const FromAuthor: Story = {
  args: {
    msg: { ...baseMsg, text: 'I\'m doing great, thanks for asking!' },
    time: '14:33',
    isAuthor: true,
    isFirst: false,
  },
}

export const LongText: Story = {
  args: {
    msg: { ...baseMsg, text: 'This is a much longer message to demonstrate how text wraps inside a message bubble. It keeps going and going until it wraps to multiple lines.' },
    time: '14:34',
    isAuthor: false,
    isFirst: true,
  },
}
