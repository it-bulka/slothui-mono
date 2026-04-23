import type { Meta, StoryObj } from '@storybook/react-vite'
import { AddPostPanel } from '@/widgets/AddPostPanel/ui/AddPostPanel/AddPostPanel'
import { ServiceProvider } from '@/shared/libs/services/context/service.provider'
import { MemoryRouter } from 'react-router'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { makeStoryStore } from './_storyHelpers'

const withAll = (Story: () => ReactNode) => (
  <Provider store={makeStoryStore()}>
    <ServiceProvider>
      <MemoryRouter>
        <div className="relative">
          <Story />
        </div>
      </MemoryRouter>
    </ServiceProvider>
  </Provider>
)

const meta: Meta<typeof AddPostPanel> = {
  title: 'Widgets/AddPostPanel',
  component: AddPostPanel,
  tags: ['autodocs'],
  decorators: [withAll],
}
export default meta
type Story = StoryObj<typeof AddPostPanel>

export const Default: Story = {}
