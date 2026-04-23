import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeSelect } from '@/widgets/ThemeSelect/ThemeSelect'

const meta: Meta<typeof ThemeSelect> = {
  title: 'Widgets/ThemeSelect',
  component: ThemeSelect,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ThemeSelect>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4">
      <ThemeSelect />
    </div>
  ),
}
