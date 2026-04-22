import type { Meta, StoryObj } from '@storybook/react-vite'
import { ImageWithFallback } from '@/shared/ui/ImageWithFallback/ui/ImageWithFallback '

const meta: Meta<typeof ImageWithFallback> = {
  title: 'Shared/ImageWithFallback',
  component: ImageWithFallback,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ImageWithFallback>

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/300?img=12',
    alt: 'User photo',
    fallback: 'https://placehold.co/300x300?text=No+Image',
    className: 'w-40 h-40 rounded-xl object-cover',
  },
}

export const WithBrokenSrc: Story = {
  args: {
    src: 'https://broken-url.example.com/image.jpg',
    alt: 'Broken image',
    fallback: 'https://placehold.co/300x300?text=No+Image',
    className: 'w-40 h-40 rounded-xl object-cover',
  },
}
