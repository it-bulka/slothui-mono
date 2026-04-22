import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScrollableBlock } from '@/shared/ui/ScrollableBlock/ui/ScrollableBlock'

const meta: Meta<typeof ScrollableBlock> = {
  title: 'Shared/ScrollableBlock',
  component: ScrollableBlock,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ScrollableBlock>

export const Default: Story = {
  render: () => (
    <div style={{ height: 200 }}>
      <ScrollableBlock>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="py-2 px-4 border-b border-gray-g3 text-sm">Item {i + 1}</div>
        ))}
      </ScrollableBlock>
    </div>
  ),
}
