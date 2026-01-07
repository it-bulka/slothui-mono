import type { FriendDto } from '@/shared/types';
import { useFriendActions } from '../../model/hooks/useFriendsActions.tsx';
import { FriendsList } from '../FriendsList/FriendsList.tsx';
import { memo } from 'react';

interface FriendsListWithActionsProps {
  friends: FriendDto[];
}

export const FriendsListWithActions = memo(({ friends }: FriendsListWithActionsProps) => {
  const { renderActions } = useFriendActions();

  return (
    <FriendsList
      friends={friends}
      renderActions={renderActions} />
  )
});

FriendsListWithActions.displayName = 'FriendsListWithActions';
