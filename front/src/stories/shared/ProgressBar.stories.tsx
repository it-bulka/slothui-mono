import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgressBar } from '@/shared/ui/ProgressBar/ui/ProgressBar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Shared/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'radio', options: ['horizontal', 'vertical'] },
    isPaused: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof ProgressBar>

export const HorizontalTop: Story = {
  args: { direction: 'horizontal', position: 'top' },
  decorators: [(Story) => <div style={{ position: 'relative', height: 60, width: 300, background: '#eee' }}><Story /></div>],
}

export const HorizontalBottom: Story = {
  args: { direction: 'horizontal', position: 'bottom' },
  decorators: [(Story) => <div style={{ position: 'relative', height: 60, width: 300, background: '#eee' }}><Story /></div>],
}

export const Paused: Story = {
  args: { direction: 'horizontal', position: 'top', isPaused: true },
  decorators: [(Story) => <div style={{ position: 'relative', height: 60, width: 300, background: '#eee' }}><Story /></div>],
}
