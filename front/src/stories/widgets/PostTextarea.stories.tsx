import type { Meta, StoryObj } from '@storybook/react-vite'
import { PostTextarea } from '@/widgets/PostTextarea/PostTextarea'
import { ServiceProvider } from '@/shared/libs/services/context/service.provider'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { makeStoryStore } from './_storyHelpers'

const withAll = (Story: () => ReactNode) => (
  <Provider store={makeStoryStore()}>
    <ServiceProvider>
      <Story />
    </ServiceProvider>
  </Provider>
)

const meta: Meta<typeof PostTextarea> = {
  title: 'Widgets/PostTextarea',
  component: PostTextarea,
  tags: ['autodocs'],
  decorators: [withAll],
}
export default meta
type Story = StoryObj<typeof PostTextarea>

export const Default: Story = {
  render: () => (
    <div className="max-w-xl p-4 bg-white rounded-xl">
      <PostTextarea />
    </div>
  ),
}
