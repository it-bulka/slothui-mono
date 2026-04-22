import type { Meta, StoryObj } from '@storybook/react-vite'
import { MapView } from '@/entities/Map/ui/MapView/MapView'

const meta: Meta<typeof MapView> = {
  title: 'Entities/Map/MapView',
  component: MapView,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full h-80 rounded-xl overflow-hidden">
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof MapView>

export const Default: Story = {
  args: {},
}

export const WithPosition: Story = {
  args: {
    position: [50.4501, 30.5234],
    locationName: 'Kyiv, Ukraine',
  },
}

export const LvivLocation: Story = {
  args: {
    position: [49.8397, 24.0297],
    locationName: 'Lviv, Ukraine',
  },
}
