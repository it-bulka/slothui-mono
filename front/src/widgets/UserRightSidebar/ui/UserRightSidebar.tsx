import { Typography, TypographyTypes } from '@/shared/ui';
import { Statistics } from '@/entities';
import { UserProfileData } from './UserProfileData/UserProfileData.tsx';
import { UserContactInformation } from './UserContactInformation/UserContactInformation.tsx';
import { useUserRightSidebar } from '../model/hooks/useUserRightSidebar.tsx';
import { ActionRow } from './ActionRow.tsx';
import { Section } from './Section.tsx';
import { Stories } from './Stories.tsx';

export const UserRightSidebar = () => {
  const { userId, isLoading, data, friend } = useUserRightSidebar();

  if (!userId) return <Typography>User not found</Typography>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <Typography>User not found</Typography>;

  return (
    <aside className="px-sidebar py-sidebar border-style-l bg-underground-secondary">
      <UserProfileData {...data} />

      <Statistics
        followingCount={data.followeesCount}
        followersCount={data.followersCount}
        postsCount={data.postsCount}
      />

      {data.description && (
        <Section title="About Me">
          <Typography type={TypographyTypes.P_SM}>
            {data.description}
          </Typography>
        </Section>
      )}

      <ActionRow userId={userId} isFollowee={friend?.isFollowee} />

      <Stories />

      <UserContactInformation contacts={[data]} />
    </aside>
  );
};
