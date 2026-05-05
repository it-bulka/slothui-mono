import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ActionButton, OverlayBadge } from '@/shared/ui';
import NotificationSvg from '@/shared/assets/images/sidebar/notification.svg?react';
import { useAppDispatch, useAppSelector } from '@/shared/config/redux';
import { selectUnreadCount, selectIsInitialized, fetchUnreadCountThunk } from '@/entities/Notification';
import { getNotificationsPage } from '@/shared/config/routeConfig/routeConfig';
import { formatBadgeCount } from '@/shared/libs';

export const NotificationAction = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const unreadCount = useAppSelector(selectUnreadCount);
  const isInitialized = useAppSelector(selectIsInitialized);

  useEffect(() => {
    if (!isInitialized) {
      dispatch(fetchUnreadCountThunk());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
