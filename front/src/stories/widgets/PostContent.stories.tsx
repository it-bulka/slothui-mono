import type { Meta, StoryObj } from '@storybook/react-vite'
import { PostContent } from '@/widgets/PostCard/PostContent/PostContent'
import { withReduxStore } from './_storyHelpers'
import type { Attachment } from '@/shared/types'

const mockImage: Attachment = {
  id: '1',
  url: 'https://picsum.photos/seed/post1/600/400',
  type: 'images',
  publicId: 'img-1',
  originalName: 'photo.jpg',
  metadata: { size: 120000, format: 'jpg' },
}

const mockAudio: Attachment = {
  id: '2',
  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  type: 'audio',
  publicId: 'audio-1',
  originalName: 'track.mp3',
  metadata: { size: 300000, format: 'mp3' },
}

const mockFile: Attachment = {
  id: '3',
  url: '#',
  type: 'file',
  publicId: 'file-1',
  originalName: 'report.pdf',
  metadata: { size: 512000, format: 'pdf' },
}

const meta: Meta<typeof PostContent> = {
  title: 'Widgets/PostCard/PostContent',
  component: PostContent,
  tags: ['autodocs'],
  decorators: [withReduxStore()],
}
export default meta
type Story = StoryObj<typeof PostContent>

export const TextOnly: Story = {
  args: { text: 'This is a simple post with some text content. #hello #world' },
}

export const MultiParagraph: Story = {
  args: {
    text: 'First paragraph of the post.\n\nSecond paragraph with #hashtag support.\n\nThird paragraph for more content.',
  },
}

export const WithImages: Story = {
  args: {
    text: 'Check out these photos!',
    images: [mockImage, { ...mockImage, id: '2', url: 'https://picsum.photos/seed/post2/600/400' }],
  },
}

export const WithAudio: Story = {
  args: {
    text: 'Listen to this track:',
    audio: [mockAudio],
  },
}

export const WithFile: Story = {
  args: {
    text: 'Here is the report:',
    file: [mockFile],
  },
}

export const NoContent: Story = {
  args: {},
}
