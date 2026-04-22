import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typing } from '@/entities/Typing/ui/Typing'

const meta: Meta<typeof Typing> = {
  title: 'Entities/Typing/Typing',
  component: Typing,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof Typing>

export const Default: Story = {
  args: { name: 'Alice' },
}

export const LongName: Story = {
  args: { name: 'John Doe Smith' },
}
