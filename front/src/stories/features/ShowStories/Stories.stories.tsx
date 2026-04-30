import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stories } from '@/features/ShowStories/ui/Stories/Stories'
import { mockStories } from '@/mock/data/stories'
import { withReduxAndRouter } from '../../widgets/_storyHelpers'

const meta: Meta<typeof Stories> = {
  title: 'Features/ShowStories/Stories',
  component: Stories,
  tags: ['autodocs'],
  decorators: [withReduxAndRouter()],
  argTypes: {
    hideUsername: { control: 'boolean' },
  },
}
export default meta
type Story = StoryObj<typeof Stories>

export const Default: Story = {
  args: {
    stories: mockStories,
  },
}

export const HideUsername: Story = {
  args: {
    stories: mockStories,
    hideUsername: true,
  },
}

export const FewStories: Story = {
  args: {
    stories: mockStories.slice(0, 3),
  },
}

export const SingleStory: Story = {
  args: {
    stories: mockStories.slice(0, 1),
  },
}

export const ManyStories: Story = {
  decorators: [
    withReduxAndRouter(),
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
  args: {
    stories: mockStories,
  },
}
