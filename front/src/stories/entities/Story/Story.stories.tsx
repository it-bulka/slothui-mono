import type { Meta, StoryObj } from '@storybook/react-vite'
import { Story } from '@/entities/Story/ui/Story/Story'

const meta: Meta<typeof Story> = {
  title: 'Entities/Story/Story',
  component: Story,
  tags: ['autodocs'],
  decorators: [
    (StoryComponent) => (
      <div className="w-72 h-[480px] rounded-2xl overflow-hidden bg-black">
        <StoryComponent />
      </div>
    ),
  ],
  argTypes: {
    type: { control: 'radio', options: ['image', 'video'] },
  },
}
export default meta
type Story_ = StoryObj<typeof Story>

export const Image: Story_ = {
  args: {
    id: 'story-1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=700&fit=crop',
    onComplete: () => {},
  },
}

export const Viewed: Story_ = {
  args: {
    id: 'story-2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=700&fit=crop',
    isViewed: true,
    onComplete: () => {},
  },
}
