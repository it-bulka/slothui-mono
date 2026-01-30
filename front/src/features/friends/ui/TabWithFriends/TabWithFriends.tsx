import { memo } from 'react';
import { Tab } from '@/shared/ui';
import { FollowersTab } from '../FollowersTab/FollowersTab.tsx';
import { FolloweeTab } from '../FolloweeTab/FolloweeTab.tsx';

interface TabWithFriendsProps {
  onTabChange?: (tabIndex: number) => void;
  userId: string;
}

export const TabWithFriends = memo(({
  userId,
  onTabChange,
}: TabWithFriendsProps) => {
  return (
    <Tab
      animated
      tabs={['followers', 'followings']}
      onTabChange={onTabChange}
      contents={[
        <FollowersTab userId={userId} />,
        <FolloweeTab userId={userId} />,
      ]}
    />
  );
});

TabWithFriends.displayName = 'TabWithFriends';
