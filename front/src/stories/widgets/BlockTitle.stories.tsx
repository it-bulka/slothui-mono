import type { Meta, StoryObj } from '@storybook/react-vite'
import { BlockTitle } from '@/widgets/BlockTitle/BlockTitle'

const meta: Meta<typeof BlockTitle> = {
  title: 'Widgets/BlockTitle',
  component: BlockTitle,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    withMargin: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof BlockTitle>

export const Default: Story = {
  args: { title: 'Section Title' },
}

export const WithMargin: Story = {
  args: { title: 'Section Title', withMargin: true },
}

export const WithoutButton: Story = {
  args: { title: 'No Button', withoutBtn: true },
}

export const WithCustomButton: Story = {
  args: {
    title: 'Custom Action',
    customBtn: <button className="text-sm text-blue-500 font-medium">See all</button>,
  },
}

export const WithClickHandler: Story = {
  args: {
    title: 'Clickable More',
    onBtnClick: () => alert('More clicked'),
  },
}
