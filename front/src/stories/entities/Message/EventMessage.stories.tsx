import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { EventMessage } from '@/entities/Message/ui/content/EventMessage/EventMessage'
import type { MessageWithEventDto } from '@/shared/types/message.dto'

const meta: Meta<typeof EventMessage> = {
  title: 'Entities/Message/EventMessage',
  component: EventMessage,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}
export default meta
type Story = StoryObj<typeof EventMessage>

const base: MessageWithEventDto = {
  id: 'msg-1',
  chatId: 'chat-1',
  text: '',
  authorId: 'user-1',
  createdAt: new Date().toISOString(),
  event: {
    id: 'evt-1',
    title: 'Tech Meetup Kyiv',
    description: 'A community gathering for developers to share ideas and network.',
    date: 'Apr 28, 2026',
    location: 'Kyiv, Podil',
  },
}

export const WithEvent: Story = {
  args: { msg: base, time: '14:32', isAuthor: false, isFirst: false },
}

export const NoLocation: Story = {
  args: {
    msg: { ...base, event: { ...base.event, location: undefined } },
    time: '14:33',
    isAuthor: true,
    isFirst: false,
  },
}

export const DeletedEvent: Story = {
  args: {
    msg: { ...base, event: null as unknown as MessageWithEventDto['event'] },
    time: '14:34',
    isAuthor: false,
    isFirst: false,
  },
}
