export {
  useFollowUser,
  useGetFollowings,
  useGetFollowers,
  useFollowersSelector,
  useFollowingsSelector,
  useRemoveFollower,
  useRemoveFollowee,
  useSuggestedFriendsSelect,
  useNewFollowersIdsSelect,
  useFollowersWithNewOnTopSelect,
  useFetchFriendsSuggestions,
} from './model/hooks';
export { friendsReducer } from './model/slice/friends.slice.ts';
export type { FriendEntity } from './model/type/friends.type.ts';