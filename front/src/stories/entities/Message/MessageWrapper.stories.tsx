import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageWrapper } from '@/entities/Message/ui/MessageWrapper/MessageWrapper'

const meta: Meta<typeof MessageWrapper> = {
  title: 'Entities/Message/MessageWrapper',
  component: MessageWrapper,
  tags: ['autodocs'],
  argTypes: {
    isAuthor: { control: 'boolean' },
    isFirst: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof MessageWrapper>

export const FromOther: Story = {
  args: {
    isAuthor: false,
    isFirst: false,
    children: 'Hello there! How are you?',
  },
}

export const FromAuthor: Story = {
  args: {
    isAuthor: true,
    isFirst: false,
    children: 'Doing great, thanks!',
  },
}

export const FirstInGroup: Story = {
  args: {
    isAuthor: false,
    isFirst: true,
    children: 'First message in a group — may have a different top margin.',
  },
}
