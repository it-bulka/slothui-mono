import { Feed } from '@/widgets/Feed';
import { useSuggestedFriendsSelect } from '@/entities/Friends';
import { FriendsList } from '@/features/friends';
import { useFriendActions } from '@/features/friends';
import { Typography } from '@/shared/ui/Typography/Typography'
import { TypographyTypes } from '@/shared/ui/Typography/typography.types';

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