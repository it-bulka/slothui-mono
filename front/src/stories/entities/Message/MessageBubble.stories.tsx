import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageBubble } from '@/entities/Message/ui/MessageBubble/MessageBubble'

const meta: Meta<typeof MessageBubble> = {
  title: 'Entities/Message/MessageBubble',
  component: MessageBubble,
  tags: ['autodocs'],
  argTypes: {
    isAuthor: { control: 'boolean' },
    maxWidth: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof MessageBubble>

export const FromOther: Story = {
  args: {
    isAuthor: false,
    children: 'Hey, how are you doing today?',
  },
}

export const FromAuthor: Story = {
  args: {
    isAuthor: true,
    children: 'I\'m doing great, thanks!',
  },
}

export const MaxWidth: Story = {
  args: {
    isAuthor: false,
    maxWidth: true,
    children: 'This is a longer message that demonstrates the max-width constraint applied to the bubble.',
  },
}
