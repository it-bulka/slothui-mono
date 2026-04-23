import type { Meta, StoryObj } from '@storybook/react-vite'
import { UpcomingEvents } from '@/widgets/UpcomingEvents/UpcomingEvents'

const meta: Meta<typeof UpcomingEvents> = {
  title: 'Widgets/UpcomingEvents',
  component: UpcomingEvents,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof UpcomingEvents>

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <UpcomingEvents />
    </div>
  ),
}
