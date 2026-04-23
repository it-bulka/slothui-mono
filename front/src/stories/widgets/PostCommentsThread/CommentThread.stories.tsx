import type { Meta, StoryObj } from '@storybook/react-vite'
import { CommentThread } from '@/widgets/PostCommentsThread/ui/CommentThread/CommentThread'
import { withReduxAndRouter } from '../_storyHelpers'

const commentState = {
  byId: {
    'comment-1': {
      id: 'comment-1',
      text: 'Great post! Really enjoyed reading this.',
      postId: 'post-1',
      parentId: null,
      repliesCount: 0,
      authorId: 'author-1',
      createdAt: '2025-01-01T00:00:00Z',
    },
    'comment-2': {
      id: 'comment-2',
      text: 'Totally agree with the points mentioned here.',
      postId: 'post-1',
      parentId: null,
      repliesCount: 1,
      authorId: 'author-2',
      createdAt: '2025-01-01T01:00:00Z',
    },
  },
  repliesByParent: {},
  repliesLoading: {},
  repliesError: {},
  postComments: { 'post-1': ['comment-1', 'comment-2'] },
  postCommentsInitialized: { 'post-1': true },
}

const meta: Meta<typeof CommentThread> = {
  title: 'Widgets/PostCommentsThread/CommentThread',
  component: CommentThread,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof CommentThread>

export const Default: Story = {
  decorators: [withReduxAndRouter({ comments: commentState as never })],
  args: { commentIds: ['comment-1', 'comment-2'], postId: 'post-1' },
}

export const SingleComment: Story = {
  decorators: [withReduxAndRouter({ comments: commentState as never })],
  args: { commentIds: ['comment-1'], postId: 'post-1' },
}
