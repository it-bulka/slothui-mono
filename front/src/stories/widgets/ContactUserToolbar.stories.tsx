import type { Meta, StoryObj } from '@storybook/react-vite'
import { ContactUserToolbar } from '@/widgets/ContactUserToolbar/ContactUserToolbar'

const meta: Meta<typeof ContactUserToolbar> = {
  title: 'Widgets/ContactUserToolbar',
  component: ContactUserToolbar,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ContactUserToolbar>

export const Default: Story = {}
