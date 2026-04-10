import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { Tab } from '@/shared/ui';
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
}

export const TabWithFriends = memo(({ userId }: TabWithFriendsProps) => {
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
      contents={[
        <FollowersTab userId={userId} />,
        <FolloweeTab userId={userId} />,
      ]}
    />
  );
});

TabWithFriends.displayName = 'TabWithFriends';
