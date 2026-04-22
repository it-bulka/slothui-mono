import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageToast } from '@/shared/ui/Toast/message/ui/MessageToast'
import { MemoryRouter } from 'react-router'

const meta: Meta<typeof MessageToast> = {
  title: 'Shared/Toast/MessageToast',
  component: MessageToast,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}
export default meta
type Story = StoryObj<typeof MessageToast>

export const Default: Story = {
  args: {
    msg: { chatId: 'chat-1', text: 'Hey, are you there?' },
    author: { nickname: 'jane_doe' },
  },
}

export const WithAttachment: Story = {
  args: {
    msg: { chatId: 'chat-2', text: null },
    author: { nickname: 'john_smith' },
  },
}
