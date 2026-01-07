import { type ReactNode, memo } from 'react';
import { AvatarWithInfo, List } from '@/shared/ui';
import type { FriendDto } from '@/shared/types';

interface FriendsListProps {
  friends: FriendDto[];
  renderActions?: (friend: FriendDto, index: number) => ReactNode;
}

export const FriendsList = memo(({ friends, renderActions }: FriendsListProps) => {
  return (
    <List topBorder={false}>
      {friends.map((friend, index) => (
        <li
          key={friend.id}
          className="flex justify-between items-center py-[0.9375rem] border-style-b gap-2"
        >
          <AvatarWithInfo
            src={friend.src}
            position={friend.nickname}
            name={friend.name}
            className="grow"
          />
          {renderActions?.(friend, index)}
        </li>
      ))}
    </List>
  );
});

FriendsList.displayName = 'FriendsList';
