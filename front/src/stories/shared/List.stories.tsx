import type { Meta, StoryObj } from '@storybook/react-vite'
import { List } from '@/shared/ui/List/List'
import { ChevronRight, Trash2 } from 'lucide-react'

const meta: Meta<typeof List> = {
  title: 'Shared/List',
  component: List,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof List>

export const WithIconBtn: Story = {
  render: () => (
    <List>
      <List.Item btnIcon={ChevronRight} onClick={() => {}}>Profile settings</List.Item>
      <List.Item btnIcon={ChevronRight} onClick={() => {}}>Notifications</List.Item>
      <List.Item btnIcon={ChevronRight} onClick={() => {}}>Privacy</List.Item>
    </List>
  ),
}

export const WithTextBtn: Story = {
  render: () => (
    <List>
      <List.Item btnText="Edit" onClick={() => {}}>Post title goes here</List.Item>
      <List.Item btnText="Edit" onClick={() => {}}>Another post</List.Item>
    </List>
  ),
}

export const ClickableRow: Story = {
  render: () => (
    <List>
      <List.Item btnIcon={Trash2} onRowClick={() => {}}>Click anywhere on this row</List.Item>
      <List.Item btnIcon={ChevronRight} onRowClick={() => {}}>Another clickable row</List.Item>
    </List>
  ),
}

export const NoTopBorder: Story = {
  render: () => (
    <List topBorder={false}>
      <List.Item btnIcon={ChevronRight} onClick={() => {}}>Item without top border</List.Item>
      <List.Item btnIcon={ChevronRight} onClick={() => {}}>Second item</List.Item>
    </List>
  ),
}
