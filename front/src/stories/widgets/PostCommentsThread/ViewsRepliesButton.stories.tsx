import type { Meta, StoryObj } from '@storybook/react-vite'
import { ViewsRepliesButton } from '@/widgets/PostCommentsThread/ui/ViewsRepliesButton/ViewsRepliesButton'
import { withReduxStore } from '../_storyHelpers'

const commentWithReplies = {
  'comment-1': {
    id: 'comment-1',
    text: 'Parent comment',
    postId: 'post-1',
    parentId: null,
    repliesCount: 3,
    authorId: 'user-1',
    createdAt: '2025-01-01T00:00:00Z',
  },
}

const meta: Meta<typeof ViewsRepliesButton> = {
  title: 'Widgets/PostCommentsThread/ViewsRepliesButton',
  component: ViewsRepliesButton,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ViewsRepliesButton>

export const WithReplies: Story = {
  decorators: [
    withReduxStore({
      comments: {
        byId: commentWithReplies,
        repliesByParent: {},
        repliesLoading: {},
        repliesError: {},
        postComments: {},
        postCommentsInitialized: {},
      } as never,
    }),
  ],
  args: { parentId: 'comment-1' },
}

export const NoReplies: Story = {
  decorators: [
    withReduxStore({
      comments: {
        byId: { 'comment-1': { ...commentWithReplies['comment-1'], repliesCount: 0 } },
        repliesByParent: {},
        repliesLoading: {},
        repliesError: {},
        postComments: {},
        postCommentsInitialized: {},
      } as never,
    }),
  ],
  args: { parentId: 'comment-1' },
}
