import type { Meta, StoryObj } from '@storybook/react-vite'
import { Portal } from '@/shared/ui/Portal/Portal'

const meta: Meta<typeof Portal> = {
  title: 'Shared/Portal',
  component: Portal,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Portal>

export const Default: Story = {
  render: () => (
    <>
      <p className="text-sm text-gray-g1">Content below is rendered via Portal into document.body:</p>
      <Portal>
        <div
          style={{ position: 'fixed', bottom: 24, right: 24 }}
          className="bg-blue-b1 text-white px-4 py-2 rounded-xl shadow-theme text-sm"
        >
          Rendered in Portal
        </div>
      </Portal>
    </>
  ),
}
