import { Typography } from '@/shared/ui/Typography/Typography'
import { TypographyTypes } from '@/shared/ui/Typography/typography.types';
import { Statistics } from '@/entities/UsersProfiles';
import { UserProfileData } from './UserProfileData/UserProfileData.tsx';
import { UserContactInformation } from './UserContactInformation/UserContactInformation.tsx';
import { useUserRightSidebar } from '../model/hooks/useUserRightSidebar.tsx';
import { ActionRow } from './ActionRow.tsx';
import { UserStories } from './UserStories.tsx';
import { SidebarInfoCard } from './SidebarInfoCard.tsx';
import { MemberSince } from './MemberSince.tsx';
import { useMediaQuery } from '@/shared/hooks';
import { UserRightSidebarLoader } from './UserRightSidebarLoader.tsx';

export const UserRightSidebar = () => {
  const { userId, isLoading, data, friend } = useUserRightSidebar();
  const isTabletOrBelow = useMediaQuery('(max-width: 1023px)');

  if (!userId) return <Typography>User not found</Typography>;
  if (isLoading) return <UserRightSidebarLoader />;
  if (!data) return <Typography>User not found</Typography>;

  return (
    <aside className="px-sidebar py-sidebar border-style-l bg-underground-secondary">
      <div className="profile-cover mb-4" />
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

      <UserContactInformation userId={userId} />

      {data.createdAt && <MemberSince createdAt={data.createdAt} />}
    </aside>
  );
};
