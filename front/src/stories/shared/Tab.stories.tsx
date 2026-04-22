import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tab } from '@/shared/ui/Tab/Tab'

const meta: Meta<typeof Tab> = {
  title: 'Shared/Tab',
  component: Tab,
  tags: ['autodocs'],
  argTypes: {
    animated: { control: 'boolean' },
    scrollableTabs: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Tab>

export const Default: Story = {
  args: {
    tabs: ['Posts', 'Friends', 'Photos'],
    contents: [
      <div className="p-4">Posts content</div>,
      <div className="p-4">Friends content</div>,
      <div className="p-4">Photos content</div>,
    ],
  },
}

export const Scrollable: Story = {
  args: {
    tabs: ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5', 'Tab 6'],
    contents: Array.from({ length: 6 }, (_, i) => <div className="p-4">Content {i + 1}</div>),
    scrollableTabs: true,
  },
  decorators: [(Story) => <div style={{ width: 300 }}><Story /></div>],
}
