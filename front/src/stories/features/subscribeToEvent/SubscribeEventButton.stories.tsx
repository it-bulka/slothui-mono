import type { Meta, StoryObj } from '@storybook/react-vite'
import { SubscribeEventButton } from '@/features/subscribeToEvent/ui/SubscribeEventButton/SubscribeEventButton'

const meta: Meta<typeof SubscribeEventButton> = {
  title: 'Features/subscribeToEvent/SubscribeEventButton',
  component: SubscribeEventButton,
  tags: ['autodocs'],
  argTypes: {
    isSubscribed: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof SubscribeEventButton>

export const Subscribe: Story = {
  args: { eventId: 'evt-1', isSubscribed: false },
}

export const Unsubscribe: Story = {
  args: { eventId: 'evt-1', isSubscribed: true },
}
