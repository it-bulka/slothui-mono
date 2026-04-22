import type { Meta, StoryObj } from '@storybook/react-vite'
import { MediaGrid } from '@/features/DraftMessage/ui/MediaGrid/MediaGrid'

const mockImage = (id: string) => ({
  id,
  tempUrl: `https://picsum.photos/seed/${id}/200/200`,
  file: { name: `${id}.jpg`, size: 102400 } as File,
})

const mockVideo = (id: string) => ({
  id,
  tempUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  file: { name: `${id}.mp4`, size: 2097152 } as File,
})

const meta: Meta<typeof MediaGrid> = {
  title: 'Features/DraftMessage/MediaGrid',
  component: MediaGrid,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof MediaGrid>

export const Images: Story = {
  args: {
    images: [mockImage('photo-1'), mockImage('photo-2'), mockImage('photo-3')],
    onDelete: () => {},
  },
}

export const Videos: Story = {
  args: {
    video: [mockVideo('clip-1'), mockVideo('clip-2')],
    onDelete: () => {},
  },
}

export const Mixed: Story = {
  args: {
    images: [mockImage('photo-a'), mockImage('photo-b')],
    video: [mockVideo('clip-a')],
    onDelete: () => {},
  },
}

export const Empty: Story = {
  args: { images: [], video: [] },
}
