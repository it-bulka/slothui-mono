import type { Meta, StoryObj } from '@storybook/react-vite'
import { CommentActions } from '@/widgets/CommentActions/CommentActions'
import { ServiceProvider } from '@/shared/libs/services/context/service.provider'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { makeStoryStore } from './_storyHelpers'

const replyTargetState = {
  replyTarget: { postId: 'post-1', parentId: null, type: 'post' } as never,
}

const withServicesAndStore = (preloaded?: object) => (Story: () => ReactNode) => (
  <Provider store={makeStoryStore(preloaded as never)}>
    <ServiceProvider>
      <Story />
    </ServiceProvider>
  </Provider>
)

const meta: Meta<typeof CommentActions> = {
  title: 'Widgets/CommentActions',
  component: CommentActions,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof CommentActions>

export const Default: Story = {
  decorators: [withServicesAndStore(replyTargetState)],
}

export const WithClassName: Story = {
  decorators: [withServicesAndStore(replyTargetState)],
  args: { className: 'border-t border-gray-g3 mt-3 pt-3' },
}
