import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from '@/shared/ui/Card/Card'

const meta: Meta<typeof Card> = {
  title: 'Shared/Card',
  component: Card,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Card>

export const BodyOnly: Story = {
  render: () => (
    <Card className="w-72">
      <Card.Body>Card body content goes here.</Card.Body>
    </Card>
  ),
}

export const WithHeader: Story = {
  render: () => (
    <Card className="w-72">
      <Card.Header>Card Header</Card.Header>
      <Card.Body>Card body content goes here.</Card.Body>
    </Card>
  ),
}

export const Full: Story = {
  render: () => (
    <Card className="w-72">
      <Card.Header>Header</Card.Header>
      <Card.Body>Main content area with some text.</Card.Body>
      <Card.Footer>Footer actions</Card.Footer>
    </Card>
  ),
}
