import { AvatarWithStatus } from '@/shared/ui';
import { NotificationAction, MessageAction, SettingAction } from '@/features';
import { FriendSuggestions } from '@/entities';
import { ProfileActivity, UpcomingEvents } from '@/widgets';
import { CurrentUserStatistics } from './CurrentUserStatistics/CurrentUserStatistics.tsx';
import { useAuthUserSelector } from '@/entities';

export const RightSidebar = () => {
  const userData = useAuthUserSelector()
  if(!userData) return <p>No auth user</p>;
  return (
    <div className="border-style-l">
      <div className={"px-6 py-5 flex justify-end gap-2 text-svg-secondary"}>
        <AvatarWithStatus
          src={userData?.avatarUrl}
          name={userData.nickname}
          isOnline={true}
          className={"mr-auto"}
        />

        <NotificationAction />
        <MessageAction />
        <SettingAction />
      </div>

      <CurrentUserStatistics />

      <div className={"p-6 flex flex-col gap-8"}>
        <FriendSuggestions />
        <ProfileActivity />
        <UpcomingEvents />
      </div>
    </div>
  )
}