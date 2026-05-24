import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { Tab } from '@/shared/ui/Tab/Tab';
import { FollowersTab } from '../FollowersTab/FollowersTab.tsx';
import { FolloweeTab } from '../FolloweeTab/FolloweeTab.tsx';

type FriendsTabType = 'followers' | 'followings';
const TABS: FriendsTabType[] = ['followers', 'followings'];

const typeToIndex = (type: string | null): number =>
  type === 'followings' ? 1 : 0;

const indexToType = (index: number): FriendsTabType =>
  TABS[index] ?? 'followers';

interface TabWithFriendsProps {
  userId: string;
  isOwner?: boolean;
}

export const TabWithFriends = memo(({ userId, isOwner = true }: TabWithFriendsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTabIndex = typeToIndex(searchParams.get('type'));

  const handleTabChange = useCallback((index: number) => {
    setSearchParams({ type: indexToType(index) }, { replace: true });
  }, [setSearchParams]);

  return (
    <Tab
      animated
      tabs={TABS}
      activeTabIndex={activeTabIndex}
      onTabChange={handleTabChange}
      bordered
      contents={[
        <FollowersTab userId={userId} isOwner={isOwner} />,
        <FolloweeTab userId={userId} isOwner={isOwner} />,
      ]}
    />
  );
});

TabWithFriends.displayName = 'TabWithFriends';
