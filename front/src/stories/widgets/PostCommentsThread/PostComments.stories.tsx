import type { Meta, StoryObj } from '@storybook/react-vite'
import { PostComments } from '@/widgets/PostCommentsThread/ui/PostComments/PostComments'
import { withReduxAndRouter } from '../_storyHelpers'

const emptyState = {
  comments: {
    byId: {},
    repliesByParent: {},
    repliesLoading: {},
    repliesError: {},
    postComments: { 'post-1': [] },
    postCommentsInitialized: { 'post-1': true },
  } as never,
}

const meta: Meta<typeof PostComments> = {
  title: 'Widgets/PostCommentsThread/PostComments',
  component: PostComments,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof PostComments>

export const Empty: Story = {
  decorators: [withReduxAndRouter(emptyState)],
  args: { postId: 'post-1' },
}

export const NoComments: Story = {
  decorators: [
    withReduxAndRouter({
      comments: {
        byId: {},
        repliesByParent: {},
        repliesLoading: {},
        repliesError: {},
        postComments: { 'post-2': [] },
        postCommentsInitialized: {},
      } as never,
    }),
  ],
  args: { postId: 'post-2' },
}
