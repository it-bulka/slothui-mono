import type { Meta, StoryObj } from '@storybook/react-vite'
import { PostsToolbar } from '@/widgets/PostsToolbar/PostsToolbar'
import { ServiceProvider } from '@/shared/libs/services/context/service.provider'
import { MemoryRouter } from 'react-router'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { makeStoryStore } from './_storyHelpers'

const withAll = (Story: () => ReactNode) => (
  <Provider store={makeStoryStore()}>
    <ServiceProvider>
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    </ServiceProvider>
  </Provider>
)

const meta: Meta<typeof PostsToolbar> = {
  title: 'Widgets/PostsToolbar',
  component: PostsToolbar,
  tags: ['autodocs'],
  decorators: [withAll],
}
export default meta
type Story = StoryObj<typeof PostsToolbar>

export const Default: Story = {}
