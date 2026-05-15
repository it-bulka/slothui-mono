import { Typography, TypographyTypes } from '@/shared/ui';
import { Statistics } from '@/entities';
import { UserProfileData } from './UserProfileData/UserProfileData.tsx';
import { UserContactInformation } from './UserContactInformation/UserContactInformation.tsx';
import { useUserRightSidebar } from '../model/hooks/useUserRightSidebar.tsx';
import { ActionRow } from './ActionRow.tsx';
import { UserStories } from './UserStories.tsx';
import { SidebarInfoCard } from './SidebarInfoCard.tsx';
import { MemberSince } from './MemberSince.tsx';
import { useMediaQuery } from '@/shared/hooks';

export const UserRightSidebar = () => {
  const { userId, isLoading, data, friend } = useUserRightSidebar();
  const isTabletOrBelow = useMediaQuery('(max-width: 1023px)');

  if (!userId) return <Typography>User not found</Typography>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <Typography>User not found</Typography>;

  return (
    <aside className="px-sidebar py-sidebar border-style-l bg-underground-secondary">
      <UserProfileData {...data} twoColumn={isTabletOrBelow} />

      <Statistics
        followingCount={data.followeesCount}
        followersCount={data.followersCount}
        postsCount={data.postsCount}
        hrefs={{
          posts: `/users/${userId}`,
          followers: `/users/${userId}/friends?type=followers`,
          following: `/users/${userId}/friends?type=followings`,
        }}
      />

      <ActionRow userId={userId} isFollowee={friend?.isFollowee} />

      <div className="mb-4">
        <UserStories userId={userId} />
      </div>

      <SidebarInfoCard title="About">
        <Typography type={TypographyTypes.P_SM}>
          {data.description || 'No information about this user yet'}
        </Typography>
      </SidebarInfoCard>

      <UserContactInformation contacts={[{ avatarSrc: data.avatarUrl, username: data.username, nickname: data.nickname }]} />

      {data.createdAt && <MemberSince createdAt={data.createdAt} />}
    </aside>
  );
};
