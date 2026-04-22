import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { Statistics } from '@/entities/UsersProfiles/ui/Statistics/Statistics'
import { StatisticsSkeleton } from '@/entities/UsersProfiles/ui/Statistics/StatisticsSkeleton/StatisticsSkeleton'

const meta: Meta<typeof Statistics> = {
  title: 'Entities/UsersProfiles/Statistics',
  component: Statistics,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  argTypes: {
    postsCount: { control: 'number' },
    followersCount: { control: 'number' },
    followingCount: { control: 'number' },
  },
}
export default meta
type Story = StoryObj<typeof Statistics>

export const Default: Story = {
  args: {
    postsCount: 42,
    followersCount: 1230,
    followingCount: 310,
  },
}

export const WithLinks: Story = {
  args: {
    postsCount: 42,
    followersCount: 1230,
    followingCount: 310,
    hrefs: {
      posts: '/posts',
      followers: '/followers',
      following: '/following',
    },
  },
}

export const Skeleton: StoryObj<typeof StatisticsSkeleton> = {
  render: () => <StatisticsSkeleton />,
}
