import type { Meta, StoryObj } from '@storybook/react-vite'
import { PollVotersList } from '@/features/PollView/ui/PollResult/PollVotersList'
import type { VoterDetails } from '@/shared/types'

const mockVoters: VoterDetails[] = [
  { id: '1', nickname: 'Alice Johnson', username: 'alice_dev', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', nickname: 'Bob Smith', username: 'bob_smith', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', nickname: 'Carol White', username: 'carol_ui', avatarUrl: undefined },
]

const meta: Meta<typeof PollVotersList> = {
  title: 'Features/PollView/PollVotersList',
  component: PollVotersList,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof PollVotersList>

export const Default: Story = {
  args: { voters: mockVoters },
}

export const Single: Story = {
  args: { voters: [mockVoters[0]] },
}

export const Empty: Story = {
  args: { voters: [] },
}
