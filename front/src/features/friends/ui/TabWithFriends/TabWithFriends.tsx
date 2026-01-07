import type { ReactNode } from 'react';
import { Tab } from '@/shared/ui';
import { useFriendActions } from '../../model/hooks/useFriendsActions.tsx';
import { FriendsList } from '../FriendsList/FriendsList.tsx';
import type { FriendEntity } from '@/entities';

interface TabWithFriendsProps {
  tabs: ReactNode[];
  contents: FriendEntity[][];
  onTabChange?: (tabIndex: number) => void;
  newFollowerIds?: string[];
}

export const TabWithFriends = ({ tabs, contents, onTabChange, newFollowerIds = [] }: TabWithFriendsProps) => {
  const { renderActions } = useFriendActions();
  return (
    <Tab
      animated
      tabs={tabs}
      onTabChange={onTabChange}
      contents={contents.map((friends, tabIndex) => (
        <FriendsList
          key={tabIndex}
          friends={friends}
          newFollowerIds={newFollowerIds}
          renderActions={(friend) => renderActions?.(friend, tabIndex)}
        />
      ))}
    />
  );
};
