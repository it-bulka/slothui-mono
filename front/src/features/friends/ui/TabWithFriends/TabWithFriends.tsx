import type { ReactNode } from 'react';
import { Tab } from '@/shared/ui';
import type { FriendDto } from '@/shared/types';
import { useFriendActions } from '../../model/hooks/useFriendsActions.tsx';
import { FriendsList } from '../FriendsList/FriendsList.tsx';

interface TabWithFriendsProps {
  tabs: ReactNode[];
  contents: FriendDto[][];
  onTabChange?: (tabIndex: number) => void;
}

export const TabWithFriends = ({ tabs, contents, onTabChange }: TabWithFriendsProps) => {
  const { renderActions } = useFriendActions();

  return (
    <Tab
      animated
      tabs={tabs}
      onTabChange={onTabChange}
      contents={contents.map((friends, tabIndex) => (
        <FriendsList key={tabIndex} friends={friends} renderActions={(friend) => renderActions?.(friend, tabIndex)} />
      ))}
    />
  );
};
