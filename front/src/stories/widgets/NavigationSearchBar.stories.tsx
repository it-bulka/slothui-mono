import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavigationSearchBar } from '@/widgets/NavigationSearchBar/ui/NavigationSearchBar/NavigationSearchBar'
import { withReduxAndRouter } from './_storyHelpers'

const meta: Meta<typeof NavigationSearchBar> = {
  title: 'Widgets/NavigationSearchBar',
  component: NavigationSearchBar,
  tags: ['autodocs'],
  decorators: [withReduxAndRouter()],
}
export default meta
type Story = StoryObj<typeof NavigationSearchBar>

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <NavigationSearchBar />
    </div>
  ),
}
