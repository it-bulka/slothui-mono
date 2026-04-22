import type { Meta, StoryObj } from '@storybook/react-vite'
import { Message } from '@/shared/ui/Message/Message'

const meta: Meta<typeof Message> = {
  title: 'Shared/Message',
  component: Message,
  tags: ['autodocs'],
  argTypes: {
    isAuthor: { control: 'boolean' },
    isFirst: { control: 'boolean' },
    maxWidth: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Message>

export const Received: Story = {
  args: { isAuthor: false, time: '14:32', children: 'Hey, how are you doing?' },
}

export const Sent: Story = {
  args: { isAuthor: true, time: '14:33', children: 'I\'m good, thanks! How about you?' },
}

export const Conversation: Story = {
  render: () => (
    <div className="flex flex-col gap-1 p-4">
      <Message isAuthor={false} time="14:30">Hey, how are you doing?</Message>
      <Message isAuthor={false} time="14:31">Long time no see!</Message>
      <Message isAuthor={true} isFirst time="14:33">I'm good, thanks! How about you?</Message>
      <Message isAuthor={true} time="14:34">Yeah, it's been a while 😄</Message>
      <Message isAuthor={false} isFirst time="14:35">All good here too!</Message>
    </div>
  ),
}
