import type { Meta, StoryObj } from '@storybook/react-vite'
import { HeroPill } from '@/features/CreateEvent/ui/CreateEventForm/HeroPill'

const meta: Meta<typeof HeroPill> = {
  title: 'Features/CreateEvent/HeroPill',
  component: HeroPill,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="relative h-24 rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="absolute top-3 left-3">
          <Story />
        </div>
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof HeroPill>

export const WithValue: Story = {
  args: {
    icon: <span>📍</span>,
    value: 'Kyiv, Podil',
  },
}

export const Empty: Story = {
  args: {
    icon: <span>📅</span>,
  },
}

export const DatePill: Story = {
  args: {
    icon: <span>🗓</span>,
    value: 'Apr 28, 2026',
  },
}
