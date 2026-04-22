import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton as SkeletonBase } from '@/shared/ui/Skeleton/ui/Skeleton'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  border?: string
  className?: string
}

const Skeleton = (props: SkeletonProps) => <SkeletonBase {...props} />
Skeleton.displayName = 'Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Shared/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    border: { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof Skeleton>

export const Text: Story = {
  args: { width: 200, height: 16, border: '4px' },
}

export const Avatar: Story = {
  args: { width: 48, height: 48, border: '50%' },
}

export const Card: Story = {
  args: { width: 300, height: 120, border: '12px' },
}

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex items-center gap-3">
        <SkeletonBase width={48} height={48} border="50%" />
        <div className="flex flex-col gap-2">
          <SkeletonBase width={140} height={14} border="4px" />
          <SkeletonBase width={100} height={12} border="4px" />
        </div>
      </div>
      <SkeletonBase width="100%" height={200} border="12px" />
      <SkeletonBase width={220} height={14} border="4px" />
      <SkeletonBase width={180} height={14} border="4px" />
    </div>
  ),
}
