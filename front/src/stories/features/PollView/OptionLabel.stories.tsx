import type { Meta, StoryObj } from '@storybook/react-vite'
import { OptionLabel } from '@/features/PollView/ui/OptionLabel'

const meta: Meta<typeof OptionLabel> = {
  title: 'Features/PollView/OptionLabel',
  component: OptionLabel,
  tags: ['autodocs'],
  argTypes: {
    percentage: { control: { type: 'range', min: 0, max: 100 } },
    votes: { control: 'number' },
  },
}
export default meta
type Story = StoryObj<typeof OptionLabel>

export const NoVotes: Story = {
  args: { value: 'Option A', votes: 0, percentage: 0 },
}

export const WithVotes: Story = {
  args: { value: 'Option B — React', votes: 42, percentage: 65 },
}

export const WithVoterAvatars: Story = {
  args: {
    value: 'Option C — Vue',
    votes: 18,
    percentage: 28,
    voters: [
      { name: 'Alice', avatar: 'https://i.pravatar.cc/150?img=1' },
      { name: 'Bob', avatar: 'https://i.pravatar.cc/150?img=2' },
      { name: 'Carol', avatar: undefined },
    ],
  },
}

export const Majority: Story = {
  args: { value: 'TypeScript', votes: 97, percentage: 97 },
}
