import { friendsAdapter } from '../adapter/friends.adapter.ts';
import type { FriendsState } from '../type/friends.type.ts';

type RemoveFriendParams = {
  state: FriendsState;
  userId: string;
  friendId: string;
  listType: 'followersByUser' | 'followingsByUser';
};

const changedFieldForListType = {
  followersByUser: 'isFollower',
  followingsByUser: 'isFollowee',
}

export function removeFriendFromList({ state, userId, friendId, listType }: RemoveFriendParams) {
  if (!userId || !friendId) return;

  const feed = state[listType][userId]
  if(feed) feed.ids = feed.ids.filter(id => id !== friendId);

  const stillUsed =
    Object.values(state.followersByUser).some(page => page.ids.includes(friendId)) ||
    Object.values(state.followingsByUser).some(page => page.ids.includes(friendId)) ||
    state.suggestions.ids.includes(friendId);

  if (stillUsed) {
    friendsAdapter.updateOne(state, {
      id: friendId,
      changes: { [changedFieldForListType[listType]]: false },
    })
  } else {
    friendsAdapter.removeOne(state, friendId);
  }
}