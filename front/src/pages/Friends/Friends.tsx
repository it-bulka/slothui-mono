import { TabWithFriends } from '@/widgets';
import { mockFriendsTabs } from '@/mock/data';



const Friends = () => {
  return (
    <>
      <TabWithFriends tabs={mockFriendsTabs.tabs} contents={mockFriendsTabs.contents}/>
    </>
  )
}

export default Friends