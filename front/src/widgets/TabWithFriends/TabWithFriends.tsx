import type { ReactNode } from 'react';
import { AvatarWithInfo, List, Tab } from '@/shared/ui';
import type { FriendDto } from '@/shared/types';
import { useFriendActions } from './model/hooks/useFriendsActions.tsx';

interface TabWithFriendsProps {
  tabs: ReactNode[];
  contents: FriendDto[][];
  onTabChange?: (tabIndex: number) => void
}

export const TabWithFriends = ({
  tabs,
  contents,
  onTabChange,
}: TabWithFriendsProps) => {
  const { renderActions } = useFriendActions()
  return (
    <Tab
      animated
      tabs={tabs}
      onTabChange={onTabChange}
      contents={contents.map((items, tabIndex) => (
        <List topBorder={false}>
          {items.map((friend) => (
            <li key={friend.id} className="flex justify-between items-center py-[0.9375rem] border-style-b gap-2">
              <AvatarWithInfo
                src={friend.src}
                position={friend.nickname}
                name={friend.username}
                className="grow"
              />
              {renderActions?.(friend, tabIndex)}
            </li>
          ))}
        </List>
      ))}
    />
  )
}