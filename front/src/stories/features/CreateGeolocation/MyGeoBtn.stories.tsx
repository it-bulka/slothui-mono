import type { Meta, StoryObj } from '@storybook/react-vite'
import { MyGeoBtn } from '@/features/CreateGeolocation/ui/MyGeoBtn/MyGeoBtn'

const meta: Meta<typeof MyGeoBtn> = {
  title: 'Features/CreateGeolocation/MyGeoBtn',
  component: MyGeoBtn,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="relative w-64 h-24 bg-gray-200 rounded-xl">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isLoading: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof MyGeoBtn>

export const Default: Story = {
  args: { isLoading: false, handleGetLocation: () => {} },
}

export const Loading: Story = {
  args: { isLoading: true, handleGetLocation: () => {} },
}
