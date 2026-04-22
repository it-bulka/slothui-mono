import type { Meta, StoryObj } from '@storybook/react-vite'
import { InlineErrorBoundary } from '@/shared/ui/ErrorBoundary/InlineErrorBoundary'

const meta: Meta<typeof InlineErrorBoundary> = {
  title: 'Shared/ErrorBoundary',
  component: InlineErrorBoundary,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof InlineErrorBoundary>

const ThrowError = () => { throw new Error('Render crash: component failed to load') }

export const ErrorState: Story = {
  render: () => (
    <InlineErrorBoundary>
      <ThrowError />
    </InlineErrorBoundary>
  ),
}

export const NoError: Story = {
  render: () => (
    <InlineErrorBoundary>
      <div className="p-4 text-sm">Content renders normally — no error.</div>
    </InlineErrorBoundary>
  ),
}
