import { memo } from 'react';
import { AvatarWithStatus } from '@/shared/ui/Avatar/AvatarWithStatus';
import { NotificationAction } from '@/features/NotificationAction';
import { MessageAction } from '@/features/MessageAction';
import { SettingAction } from '@/features/SettingAction';
import { ThemeToggleAction } from '@/features/ThemeToggleAction';
import { useAuthUserSelector } from '@/entities/AuthUser';

export const SidebarHeader = memo(() => {
  const userData = useAuthUserSelector();
  if (!userData) return null;

  return (
    <div className="px-6 py-5 flex justify-end gap-2 text-svg-secondary">
      <AvatarWithStatus
        src={userData.avatarUrl}
        name={userData.nickname}
        isOnline={true}
        className="mr-auto"
      />
      <ThemeToggleAction />
      <NotificationAction />
      <MessageAction />
      <SettingAction />
    </div>
  );
});

SidebarHeader.displayName = 'SidebarHeader';
