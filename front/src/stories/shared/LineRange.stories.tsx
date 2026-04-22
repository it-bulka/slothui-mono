import type { Meta, StoryObj } from '@storybook/react-vite'
import { LineRange } from '@/shared/ui/LineRange/ui/LineRange'

const meta: Meta<typeof LineRange> = {
  title: 'Shared/LineRange',
  component: LineRange,
  tags: ['autodocs'],
  argTypes: {
    percentage: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
}
export default meta
type Story = StoryObj<typeof LineRange>

export const Empty: Story = { args: { percentage: 0 } }
export const Half: Story = { args: { percentage: 50 } }
export const Full: Story = { args: { percentage: 100 } }
export const Custom: Story = { args: { percentage: 72 } }
