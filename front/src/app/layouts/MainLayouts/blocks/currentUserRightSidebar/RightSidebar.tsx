import { AvatarWithStatus } from '@/shared/ui';
import { NotificationAction, MessageAction, SettingAction, ThemeToggleAction } from '@/features';
import { FriendSuggestions } from '@/entities';
import { ProfileActivity, UpcomingEvents, CurrentUserStories } from '@/widgets';
import { CurrentUserStatistics } from './CurrentUserStatistics/CurrentUserStatistics.tsx';
import { useAuthUserSelector } from '@/entities';

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
        <FriendSuggestions />
        <ProfileActivity />
        <UpcomingEvents />
      </div>
    </div>
  );
};
