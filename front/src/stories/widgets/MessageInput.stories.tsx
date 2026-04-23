import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageInput } from '@/widgets/MessageInput/MessageInput'
import { ServiceProvider } from '@/shared/libs/services/context/service.provider'
import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { makeStoryStore } from './_storyHelpers'

const withAll = (Story: () => ReactNode) => (
  <Provider store={makeStoryStore({ currentChat: { id: 'chat-1' } as never })}>
    <ServiceProvider>
      <Story />
    </ServiceProvider>
  </Provider>
)

const meta: Meta<typeof MessageInput> = {
  title: 'Widgets/MessageInput',
  component: MessageInput,
  tags: ['autodocs'],
  decorators: [withAll],
}
export default meta
type Story = StoryObj<typeof MessageInput>

export const Default: Story = {
  render: () => (
    <div className="w-full border-t border-gray-g3 bg-underground-primary p-2">
      <MessageInput />
    </div>
  ),
}

export const WithCustomClass: Story = {
  args: { className: 'rounded-xl border border-gray-g3 px-3 py-2' },
}
