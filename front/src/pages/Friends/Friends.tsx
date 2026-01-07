import { TabWithFriends } from '@/features';
import { mockFriendsTabs } from '@/mock/data';

const Friends = () => {
  return (
    <>
      <TabWithFriends tabs={mockFriendsTabs.tabs} contents={mockFriendsTabs.contents}/>
    </>
  )
}

export default Friends