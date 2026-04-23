import type { Meta, StoryObj } from '@storybook/react-vite'
import { ActionRow } from '@/widgets/UserRightSidebar/ui/ActionRow'
import { withReduxAndRouter } from '../_storyHelpers'

const meta: Meta<typeof ActionRow> = {
  title: 'Widgets/UserRightSidebar/ActionRow',
  component: ActionRow,
  tags: ['autodocs'],
  decorators: [withReduxAndRouter()],
  argTypes: {
    userId: { control: 'text' },
    isFollowee: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof ActionRow>

export const Following: Story = {
  args: { userId: 'user-1', isFollowee: true },
}

export const NotFollowing: Story = {
  args: { userId: 'user-2', isFollowee: false },
}

export const UnknownStatus: Story = {
  args: { userId: 'user-3', isFollowee: undefined },
}
