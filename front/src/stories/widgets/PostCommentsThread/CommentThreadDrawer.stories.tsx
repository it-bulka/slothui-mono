import type { Meta, StoryObj } from '@storybook/react-vite'
import { CommentThreadDrawer } from '@/widgets/PostCommentsThread/ui/CommentThreadDrawer/CommentThreadDrawer'
import { ServiceProvider } from '@/shared/libs/services/context/service.provider'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { makeStoryStore } from '../_storyHelpers'

const commentState = {
  comments: {
    byId: {
      'comment-1': {
        id: 'comment-1',
        text: 'First comment on the post.',
        postId: 'post-1',
        parentId: null,
        repliesCount: 0,
        authorId: 'author-1',
        createdAt: '2025-01-01T00:00:00Z',
      },
    },
    repliesByParent: {},
    repliesLoading: {},
    repliesError: {},
    postComments: { 'post-1': ['comment-1'] },
    postCommentsInitialized: { 'post-1': true },
    replyTarget: { postId: 'post-1', parentId: null, type: 'post' },
  } as never,
  replyTarget: { postId: 'post-1', parentId: null, type: 'post' } as never,
}

const withAll = (Story: () => ReactNode) => (
  <Provider store={makeStoryStore(commentState)}>
    <ServiceProvider>
      <Story />
    </ServiceProvider>
  </Provider>
)

const meta: Meta<typeof CommentThreadDrawer> = {
  title: 'Widgets/PostCommentsThread/CommentThreadDrawer',
  component: CommentThreadDrawer,
  tags: ['autodocs'],
  decorators: [withAll],
}
export default meta
type Story = StoryObj<typeof CommentThreadDrawer>

export const Open: Story = {
  args: { postId: 'post-1', isOpen: true, onClose: () => {} },
}

export const Closed: Story = {
  args: { postId: 'post-1', isOpen: false, onClose: () => {} },
}
