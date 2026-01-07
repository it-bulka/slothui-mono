import { Feed } from '@/widgets';
import { useSuggestedFriendsSelect } from '@/entities';
import { FriendsList } from '@/features';
import { useFriendActions } from '@/features/friends';
import { Typography } from '@/shared/ui';

const MyFriendsSuggestions = () => {
  const friends = useSuggestedFriendsSelect();
  const { renderActions } = useFriendActions();
  return (
    <Feed>
      {!friends.length && <Typography>No suggestions for you</Typography>}
      <FriendsList
        friends={friends}
        renderActions={renderActions}
      />
    </Feed>
  )
}

export default MyFriendsSuggestions