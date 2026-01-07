import { type ReactNode, memo } from 'react';
import { AvatarWithInfo, List, Typography } from '@/shared/ui';
import { twMerge } from 'tailwind-merge';
import classnames from 'classnames';
import type { FriendEntity } from '@/entities';

interface FriendsListProps {
  friends: FriendEntity[];
  newFollowerIds?: string[];
  renderActions?: (friend: FriendEntity, index: number) => ReactNode;
}

export const FriendsList = memo(({
  friends,
  renderActions,
  newFollowerIds = []
}: FriendsListProps) => {
  return (
    <List topBorder={false}>
      {friends.map((friend, index) => {
        const isNew = newFollowerIds.includes(friend.id);
        return <li
          key={friend.id}
          className={twMerge(classnames(
            "relative flex justify-between items-center py-[0.9375rem] border-style-b gap-2 px-2",
            { 'bg-blue-200': isNew}))
        }>
          {isNew && <Typography
            bold
            variant="span"
            className="absolute top-0 right-0 text-blue-400 px-2"
          >
            new
          </Typography>
          }
          <AvatarWithInfo
            src={friend.src}
            position={friend.nickname}
            name={friend.name}
            className="grow"
          />
          {renderActions?.(friend, index)}
        </li>
      })}
    </List>
  );
});

FriendsList.displayName = 'FriendsList';
