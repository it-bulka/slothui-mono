import { Typography } from '@/shared/ui/Typography/Typography'
import { TypographyTypes } from '@/shared/ui/Typography/typography.types';
import { FriendSuggestions } from '@/entities/FriendSuggestions';
import { ProfileActivity } from '@/widgets/ProfileActitvity';
import { UpcomingEvents } from '@/widgets/UpcomingEvents';
import { CurrentUserStories } from '@/widgets/CurrentUserStories';
import { CurrentUserStatistics } from './CurrentUserStatistics/CurrentUserStatistics.tsx';
import { SidebarHeader } from '@/widgets/SidebarHeader';
import { useAuthUserSelector } from '@/entities/AuthUser';
import { SidebarInfoCard } from '@/widgets/UserRightSidebar/ui/SidebarInfoCard.tsx';
import { UserContactInformation } from '@/widgets/UserRightSidebar/ui/UserContactInformation/UserContactInformation.tsx';

interface RightSidebarProps {
  compact?: boolean;
}

export const RightSidebar = ({ compact = false }: RightSidebarProps) => {
  const userData = useAuthUserSelector();
  if (!userData) return <p>No auth user</p>;

  return (
    <div className="border-style-l bg-white h-full">
      {!compact && <SidebarHeader />}

      <div className="profile-hero mx-4 mb-4">
        <CurrentUserStatistics />

        <div className="px-6 py-3 flex justify-center">
          <CurrentUserStories />
        </div>
      </div>

      <div className="p-6 flex flex-col gap-8">
        <SidebarInfoCard title="About">
          <Typography type={TypographyTypes.P_SM}>
            {userData.bio || 'No information yet'}
          </Typography>
        </SidebarInfoCard>

        <UserContactInformation userId={userData.id} />

        <FriendSuggestions />
        <ProfileActivity />
        <UpcomingEvents />
      </div>
    </div>
  );
};
