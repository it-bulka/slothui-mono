import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserRightSidebar } from '@/widgets/UserRightSidebar/ui/UserRightSidebar'
import { makeStoryStore } from '../_storyHelpers'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router'
import type { ReactNode } from 'react'
import { ServiceProvider } from '@/shared/libs/services/context/service.provider'

const mockProfile = {
  id: 'user-1',
  username: 'john_doe',
  nickname: 'John Doe',
  avatarUrl: 'https://i.pravatar.cc/150?img=10',
  description: 'Frontend developer passionate about UX and clean code.',
  followeesCount: 128,
  followersCount: 256,
  postsCount: 42,
  fetchedAt: Date.now(),
}

const makeDecorator = (preloaded?: object) => (Story: () => ReactNode) => (
  <Provider store={makeStoryStore(preloaded as never)}>
    <ServiceProvider>
      <MemoryRouter initialEntries={['/users/user-1']}>
        <Routes>
          <Route path="/users/:id" element={<Story />} />
        </Routes>
      </MemoryRouter>
    </ServiceProvider>
  </Provider>
)

const meta: Meta<typeof UserRightSidebar> = {
  title: 'Widgets/UserRightSidebar',
  component: UserRightSidebar,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof UserRightSidebar>

export const WithUser: Story = {
  decorators: [
    makeDecorator({
      usersProfiles: {
        ids: ['user-1'],
        entities: { 'user-1': mockProfile },
      },
      friends: { ids: [], entities: {} },
    }),
  ],
  render: () => (
    <div className="w-72">
      <UserRightSidebar />
    </div>
  ),
}

export const Loading: Story = {
  decorators: [
    makeDecorator({
      usersProfiles: {
        ids: ['user-1'],
        entities: { 'user-1': { ...mockProfile, isLoading: true } },
      },
      friends: { ids: [], entities: {} },
    }),
  ],
  render: () => (
    <div className="w-72">
      <UserRightSidebar />
    </div>
  ),
}

export const NoUser: Story = {
  decorators: [
    makeDecorator({
      usersProfiles: { ids: [], entities: {} },
      friends: { ids: [], entities: {} },
    }),
  ],
  render: () => (
    <div className="w-72">
      <UserRightSidebar />
    </div>
  ),
}
