import { useEffect, useCallback, memo } from 'react';
import { useNavigate, useMatch } from 'react-router';
import { ActionButton } from '@/shared/ui/ActionButton'
import { OverlayBadge } from '@/shared/ui/OverlayBadge/OverlayBadge';
import NotificationSvg from '@/shared/assets/images/sidebar/notification.svg?react';
import { useAppDispatch, useAppSelector } from '@/shared/config/redux';
import { selectUnreadCount, selectIsInitialized, fetchUnreadCountThunk } from '@/entities/Notification';
import { getNotificationsPage } from '@/shared/config/routeConfig/routeConfig';
import { formatBadgeCount } from '@/shared/libs/formatBadgeCount';

export const NotificationAction = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const unreadCount = useAppSelector(selectUnreadCount);
  const isInitialized = useAppSelector(selectIsInitialized);
  const isOnNotificationsPage = !!useMatch(getNotificationsPage());

  useEffect(() => {
    if (!isInitialized) {
      dispatch(fetchUnreadCountThunk());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const badgeCount = isOnNotificationsPage ? 0 : unreadCount;

  const handleClick = useCallback(() => navigate(getNotificationsPage()), [navigate]);

  return (
    <OverlayBadge content={formatBadgeCount(badgeCount)} show={badgeCount > 0}>
      <ActionButton
        variant="secondary"
        Icon={NotificationSvg}
        onClick={handleClick}
        aria-label="Notifications"
      />
    </OverlayBadge>
  );
});

NotificationAction.displayName = 'NotificationAction';
