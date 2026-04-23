import type { Meta, StoryObj } from '@storybook/react-vite'
import { AttachAction } from '@/widgets/AttachAction/ui/AttachAction'
import { ServiceProvider } from '@/shared/libs/services/context/service.provider'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { makeStoryStore } from './_storyHelpers'
import { withDraftMessageProvider } from '@/features/DraftMessage'

const AttachActionWrapped = withDraftMessageProvider(AttachAction)

const withAll = (Story: () => ReactNode) => (
  <Provider store={makeStoryStore()}>
    <ServiceProvider>
      <div className="p-8">
        <Story />
      </div>
    </ServiceProvider>
  </Provider>
)

const meta: Meta<typeof AttachActionWrapped> = {
  title: 'Widgets/AttachAction',
  component: AttachActionWrapped,
  tags: ['autodocs'],
  decorators: [withAll],
}
export default meta
type Story = StoryObj<typeof AttachActionWrapped>

export const Default: Story = {}

export const PhotosAndDocuments: Story = {
  args: { actions: ['photos', 'document'] },
}

export const AllActions: Story = {
  args: { actions: ['photos', 'camera', 'geo', 'contacts', 'document', 'audio', 'poll'] },
}
