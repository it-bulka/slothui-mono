import { AvatarWithStatus, Statistics } from '@/shared/ui';
import { NotificationAction, MessageAction, SettingAction } from '@/features';
import AvatarImg from '@/mock/images/avatar.png'
import { FriendSuggestions } from '@/entities';
import { ProfileActivity, UpcomingEvents } from '@/widgets';
import { statistics } from '@/mock/data';

export const RightSidebar = () => {
  return (
    <div className="border-style-l">
      <div className={"px-6 py-5 flex justify-end gap-2 text-svg-secondary"}>
        <AvatarWithStatus src={AvatarImg} isOnline={true} className={"mr-auto"}/>

        <NotificationAction />
        <MessageAction />
        <SettingAction />
      </div>

      <Statistics data={statistics} />

      <div className={"p-6 flex flex-col gap-8"}>
        <FriendSuggestions />
        <ProfileActivity />
        <UpcomingEvents />
      </div>
    </div>
  )
}