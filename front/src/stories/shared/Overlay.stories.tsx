import type { Meta, StoryObj } from '@storybook/react-vite'
import { Overlay } from '@/shared/ui/Overlay/Overlay'

const meta: Meta<typeof Overlay> = {
  title: 'Shared/Overlay',
  component: Overlay,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Overlay>

export const Default: Story = {
  render: () => (
    <div style={{ position: 'relative', width: 300, height: 200 }}>
      <div className="p-4 bg-underground-primary border border-gray-g3 rounded-xl">Content behind overlay</div>
      <Overlay onClick={() => {}} />
    </div>
  ),
}
