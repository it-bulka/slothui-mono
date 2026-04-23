import type { Meta, StoryObj } from '@storybook/react-vite'
import { SharePost } from '@/widgets/SharePost/ui/SharePost/SharePost'
import { ServiceProvider } from '@/shared/libs/services/context/service.provider'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { makeStoryStore } from './_storyHelpers'

const withServicesAndStore = (Story: () => ReactNode) => (
  <Provider store={makeStoryStore({ chats: { list: [], isLoading: false } as never })}>
    <ServiceProvider>
      <Story />
    </ServiceProvider>
  </Provider>
)

const meta: Meta<typeof SharePost> = {
  title: 'Widgets/SharePost',
  component: SharePost,
  tags: ['autodocs'],
  decorators: [withServicesAndStore],
}
export default meta
type Story = StoryObj<typeof SharePost>

export const Default: Story = {
  args: { postId: 'post-1' },
}
