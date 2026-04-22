import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchSuggestionsList } from '@/shared/ui/SearchSuggestionsList/ui/SearchSuggestionsList/SearchSuggestionsList'
import { MemoryRouter } from 'react-router'

const meta: Meta<typeof SearchSuggestionsList> = {
  title: 'Shared/SearchSuggestionsList',
  component: SearchSuggestionsList,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
}
export default meta
type Story = StoryObj<typeof SearchSuggestionsList>

export const WithResults: Story = {
  args: {
    items: [
      { id: '1', name: 'Alice Johnson', path: '/profile/alice' },
      { id: '2', name: 'Bob Smith', path: '/profile/bob' },
      { id: '3', name: 'Carol Williams', path: '/profile/carol' },
    ],
  },
}

export const Empty: Story = {
  args: { items: [] },
}
