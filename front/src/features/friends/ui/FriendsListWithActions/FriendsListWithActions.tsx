import { useFriendActions } from '../../model/hooks/useFriendsActions.tsx';
import { FriendsList } from '../FriendsList/FriendsList.tsx';
import { memo } from 'react';
import type { FriendEntity } from '@/entities/Friends';

interface FriendsListWithActionsProps {
  friends: FriendEntity[];
}

export const FriendsListWithActions = memo(({ friends }: FriendsListWithActionsProps) => {
  const { renderActions } = useFriendActions('suggestions');

  return (
    <FriendsList
      friends={friends}
      renderActions={renderActions} />
  )
});

FriendsListWithActions.displayName = 'FriendsListWithActions';
