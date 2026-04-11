import { useNavigate } from 'react-router';
import { ActionButton, OverlayBadge } from '@/shared/ui';
import NotificationSvg from '@/shared/assets/images/sidebar/notification.svg?react';
import { useAppSelector } from '@/shared/config/redux';
import { selectUnreadCount } from '@/entities/Notification';
import { getNotificationsPage } from '@/shared/config/routeConfig/routeConfig';
import { formatBadgeCount } from '@/shared/libs';

export const NotificationAction = () => {
  const navigate = useNavigate();
  const unreadCount = useAppSelector(selectUnreadCount);

  return (
    <OverlayBadge content={formatBadgeCount(unreadCount)} show={unreadCount > 0}>
      <ActionButton
        variant="secondary"
        Icon={NotificationSvg}
        onClick={() => navigate(getNotificationsPage())}
      />
    </OverlayBadge>
  );
};
