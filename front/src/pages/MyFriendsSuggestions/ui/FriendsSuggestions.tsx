import { Feed } from '@/widgets';
import { useSuggestedFriendsSelect } from '@/entities';
import { FriendsList } from '@/features';
import { useFriendActions } from '@/features/friends';
import { Typography, TypographyTypes } from '@/shared/ui';

const MyFriendsSuggestions = () => {
  const friends = useSuggestedFriendsSelect();
  const { renderActions } = useFriendActions('suggestions');
  return (
    <Feed
      header={(
        <Typography
          variant="h1"
          type={TypographyTypes.BLOCK_TITLE} bold className="toolbar">
            Friends Suggestions
        </Typography>
      )}
    >
      {!friends.length && <Typography>No suggestions for you</Typography>}
      <FriendsList
        friends={friends}
        renderActions={renderActions}
      />
    </Feed>
  )
}

export default MyFriendsSuggestions