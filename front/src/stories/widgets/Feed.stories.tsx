import type { Meta, StoryObj } from '@storybook/react-vite'
import { Feed } from '@/widgets/Feed/Feed'

const meta: Meta<typeof Feed> = {
  title: 'Widgets/Feed',
  component: Feed,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Feed>

export const Default: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">Post card placeholder 1</div>
        <div className="bg-white rounded-xl p-4 shadow-sm">Post card placeholder 2</div>
      </div>
    ),
  },
}

export const WithHeader: Story = {
  args: {
    header: (
      <div className="px-4 py-3 font-semibold border-b">Feed Toolbar</div>
    ),
    children: (
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">Post card placeholder 1</div>
        <div className="bg-white rounded-xl p-4 shadow-sm">Post card placeholder 2</div>
      </div>
    ),
  },
}

export const Empty: Story = {
  args: {
    children: <p className="text-center text-gray-400 py-12">No posts yet</p>,
  },
}
