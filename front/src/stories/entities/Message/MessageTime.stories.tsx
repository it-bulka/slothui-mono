import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageTime } from '@/entities/Message/ui/MessageTime/MessageTime'

const meta: Meta<typeof MessageTime> = {
  title: 'Entities/Message/MessageTime',
  component: MessageTime,
  tags: ['autodocs'],
  argTypes: {
    time: { control: 'text' },
    position: { control: 'radio', options: ['static', 'absolute'] },
    variant: { control: 'radio', options: ['default', 'onMedia'] },
  },
}
export default meta
type Story = StoryObj<typeof MessageTime>

export const Default: Story = {
  args: { time: '14:32' },
}

export const OnMedia: Story = {
  args: { time: '14:32', variant: 'onMedia' },
  decorators: [
    (Story) => (
      <div className="relative w-48 h-32 bg-gray-400 rounded-lg overflow-hidden">
        <Story />
      </div>
    ),
  ],
}

export const Absolute: Story = {
  args: { time: '09:15', position: 'absolute' },
  decorators: [
    (Story) => (
      <div className="relative w-48 h-32 bg-gray-400 rounded-lg overflow-hidden">
        <Story />
      </div>
    ),
  ],
}
