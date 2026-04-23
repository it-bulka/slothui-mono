import type { Meta, StoryObj } from '@storybook/react-vite'
import { PostActions } from '@/widgets/PostCard/PostActions/PostActions'
import { withReduxAndRouter } from './_storyHelpers'

const meta: Meta<typeof PostActions> = {
  title: 'Widgets/PostCard/PostActions',
  component: PostActions,
  tags: ['autodocs'],
  decorators: [withReduxAndRouter()],
}
export default meta
type Story = StoryObj<typeof PostActions>

export const Default: Story = {
  args: { postId: 'post-1' },
}

export const WithCommentClick: Story = {
  args: {
    postId: 'post-2',
    onCommentClick: () => alert('Comment clicked'),
  },
}
