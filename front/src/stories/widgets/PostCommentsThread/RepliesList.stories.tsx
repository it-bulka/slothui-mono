import type { Meta, StoryObj } from '@storybook/react-vite'
import { RepliesList } from '@/widgets/PostCommentsThread/ui/RepliesList/RepliesList'
import { withReduxAndRouter } from '../_storyHelpers'

const commentState = {
  byId: {
    'comment-1': {
      id: 'comment-1',
      text: 'Parent comment',
      postId: 'post-1',
      parentId: null,
      repliesCount: 2,
      authorId: 'author-1',
      createdAt: '2025-01-01T00:00:00Z',
    },
    'reply-1': {
      id: 'reply-1',
      text: 'First reply',
      postId: 'post-1',
      parentId: 'comment-1',
      repliesCount: 0,
      authorId: 'author-2',
      createdAt: '2025-01-01T01:00:00Z',
    },
    'reply-2': {
      id: 'reply-2',
      text: 'Second reply',
      postId: 'post-1',
      parentId: 'comment-1',
      repliesCount: 0,
      authorId: 'author-3',
      createdAt: '2025-01-01T02:00:00Z',
    },
  },
  repliesByParent: {
    'comment-1': ['reply-1', 'reply-2'],
  },
  repliesLoading: {},
  repliesError: {},
  postComments: {},
  postCommentsInitialized: {},
}

const meta: Meta<typeof RepliesList> = {
  title: 'Widgets/PostCommentsThread/RepliesList',
  component: RepliesList,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof RepliesList>

export const WithReplies: Story = {
  decorators: [withReduxAndRouter({ comments: commentState as never })],
  args: { parentId: 'comment-1', level: 1 },
}

export const Empty: Story = {
  decorators: [
    withReduxAndRouter({
      comments: { ...commentState, repliesByParent: {} } as never,
    }),
  ],
  args: { parentId: 'comment-1', level: 1 },
  render: () => <p className="text-sm text-gray-400">No replies (renders null)</p>,
}
