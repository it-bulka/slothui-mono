import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProfileActivity } from '@/widgets/ProfileActitvity/ProfileActitvity'
import { withReduxStore } from './_storyHelpers'

const mockAnalyticsData = {
  delta: 42,
  percent: 15,
  period: 'month' as const,
  lastFollowers: [
    { id: '1', username: 'alice', nickname: 'Alice', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', username: 'bob', nickname: 'Bob', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', username: 'carol', nickname: 'Carol', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
  ],
}

const meta: Meta<typeof ProfileActivity> = {
  title: 'Widgets/ProfileActivity',
  component: ProfileActivity,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ProfileActivity>

export const WithPositiveGrowth: Story = {
  decorators: [
    withReduxStore({
      analytics: { data: mockAnalyticsData, isLoading: false } as never,
    }),
  ],
  render: () => (
    <div className="w-80">
      <ProfileActivity />
    </div>
  ),
}

export const WithNegativeGrowth: Story = {
  decorators: [
    withReduxStore({
      analytics: {
        data: {
          delta: -8,
          percent: -12,
          period: 'month' as const,
          lastFollowers: [{ id: '1', username: 'user', nickname: 'User', avatarUrl: 'https://i.pravatar.cc/150?img=5' }],
        },
        isLoading: false,
      } as never,
    }),
  ],
  render: () => (
    <div className="w-80">
      <ProfileActivity />
    </div>
  ),
}

export const Loading: Story = {
  decorators: [
    withReduxStore({
      analytics: { data: undefined, isLoading: true } as never,
    }),
  ],
  render: () => (
    <div className="w-80">
      <ProfileActivity />
    </div>
  ),
}

export const NoData: Story = {
  decorators: [
    withReduxStore({
      analytics: { data: undefined, isLoading: false } as never,
    }),
  ],
  render: () => (
    <div className="w-80">
      <ProfileActivity />
    </div>
  ),
}
