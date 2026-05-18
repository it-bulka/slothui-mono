import { AvatarWithStatus } from '@/shared/ui/Avatar/AvatarWithStatus'
import { Typography } from '@/shared/ui/Typography/Typography'
import { TypographyTypes } from '@/shared/ui/Typography/typography.types';
import { NotificationAction } from '@/features/NotificationAction';
import { MessageAction } from '@/features/MessageAction';
import { SettingAction } from '@/features/SettingAction';
import { ThemeToggleAction } from '@/features/ThemeToggleAction';
import { FriendSuggestions } from '@/entities/FriendSuggestions';
import { ProfileActivity } from '@/widgets/ProfileActitvity';
import { UpcomingEvents } from '@/widgets/UpcomingEvents';
import { CurrentUserStories } from '@/widgets/CurrentUserStories';
import { CurrentUserStatistics } from './CurrentUserStatistics/CurrentUserStatistics.tsx';
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
    <div className="border-style-l bg-light-l2 h-full">
      {!compact && (
        <div className="px-6 py-5 flex justify-end gap-2 text-svg-secondary">
          <AvatarWithStatus
            src={userData?.avatarUrl}
            name={userData.nickname}
            isOnline={true}
            className="mr-auto"
          />
          <ThemeToggleAction />
          <NotificationAction />
          <MessageAction />
          <SettingAction />
        </div>
      )}

      <CurrentUserStatistics />

      <div className="px-6 py-3 flex justify-center">
        <CurrentUserStories />
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
