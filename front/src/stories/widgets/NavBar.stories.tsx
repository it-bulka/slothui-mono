import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavBar } from '@/widgets/NavBar/NavBar'
import { withReduxAndRouter } from './_storyHelpers'

const meta: Meta<typeof NavBar> = {
  title: 'Widgets/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  decorators: [withReduxAndRouter()],
}
export default meta
type Story = StoryObj<typeof NavBar>

export const Default: Story = {}

export const WithCounts: Story = {
  decorators: [
    withReduxAndRouter({
      notificationsCounters: {
        unreadMessagesTotal: 4,
        unreadMessagesByChat: {},
        newFollowers: 2,
        isLoading: false,
      } as never,
    }),
  ],
}

export const WithClassName: Story = {
  args: { className: 'bg-light-l1 p-4 rounded-xl' },
}
