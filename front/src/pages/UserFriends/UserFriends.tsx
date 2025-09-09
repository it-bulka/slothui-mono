import { TabWithFriends } from '@/widgets';
import { mockFriendsTabs } from '@/mock/data';

const UserFriends = () => {
  return (
    <TabWithFriends tabs={mockFriendsTabs.tabs} contents={mockFriendsTabs.contents}/>
  )
}

export default UserFriends