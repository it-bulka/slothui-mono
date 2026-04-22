import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryProgress } from '@/features/ShowStories/ui/StoryProgress/StoryProgress'

const meta: Meta<typeof StoryProgress> = {
  title: 'Features/ShowStories/StoryProgress',
  component: StoryProgress,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="relative w-72 h-8 bg-gray-800 rounded">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    amount: { control: { type: 'range', min: 2, max: 10 } },
    activeIndex: { control: { type: 'range', min: 0, max: 9 } },
  },
}
export default meta
type Story = StoryObj<typeof StoryProgress>

export const First: Story = {
  args: { amount: 5, activeIndex: 0 },
}

export const Middle: Story = {
  args: { amount: 5, activeIndex: 2 },
}

export const Last: Story = {
  args: { amount: 5, activeIndex: 4 },
}

export const TwoStories: Story = {
  args: { amount: 2, activeIndex: 0 },
}
