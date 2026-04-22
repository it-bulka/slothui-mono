import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toggler } from '@/shared/ui/Toggler/Toggler'
import { TogglerBtn } from '@/shared/ui/Toggler/TogglerBtn'

const meta: Meta<typeof Toggler> = {
  title: 'Shared/Toggler',
  component: Toggler,
  tags: ['autodocs'],
}
export default meta

export const Default: StoryObj<typeof Toggler> = {
  args: { label: 'Enable notifications', onChange: () => {} },
}

export const InitiallyOn: StoryObj<typeof Toggler> = {
  args: { label: 'Dark mode', initialState: true, onChange: () => {} },
}

export const ButtonOnly: StoryObj<typeof TogglerBtn> = {
  render: () => <TogglerBtn initialState={false} onChange={() => {}} />,
}

export const ButtonOnlyActive: StoryObj<typeof TogglerBtn> = {
  render: () => <TogglerBtn initialState={true} onChange={() => {}} />,
}
