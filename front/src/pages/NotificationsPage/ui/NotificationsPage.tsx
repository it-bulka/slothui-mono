import { memo, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/config/redux';
import {
  selectNotifications,
  selectIsInitialized,
  selectUnreadCount,
  selectHasNewNotifications,
  selectHasMore,
  selectNextCursor,
  selectIsLoading,
  fetchNotificationsThunk,
  loadMoreNotificationsThunk,
  useMarkReadNotifications,
} from '@/entities/Notification';
import { useInfiniteScroll } from '@/shared/hooks';
import { Typography } from '@/shared/ui';
import { TypographyTypes } from '@/shared/ui/Typography/typography.types';
import { NotificationItem } from './NotificationItem';

const NotificationsPage = memo(() => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);
  const isInitialized = useAppSelector(selectIsInitialized);
  const unreadCount = useAppSelector(selectUnreadCount);
  const hasNew = useAppSelector(selectHasNewNotifications);
  const hasMore = useAppSelector(selectHasMore);
  const nextCursor = useAppSelector(selectNextCursor);
  const isLoading = useAppSelector(selectIsLoading);
  const { markReadNotifications } = useMarkReadNotifications();

  useEffect(() => {
    if (unreadCount > 0) {
      dispatch(fetchNotificationsThunk()).unwrap()
        .then(() => markReadNotifications())
        .catch(() => {});
    } else if (!isInitialized) {
      dispatch(fetchNotificationsThunk());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = useCallback(() => {
    dispatch(fetchNotificationsThunk()).unwrap()
      .then(() => markReadNotifications())
      .catch(() => {});
  }, [dispatch, markReadNotifications]);

  const onLoadMore = useCallback(() => {
    if (nextCursor) {
      dispatch(loadMoreNotificationsThunk({ cursor: nextCursor }));
    }
  }, [dispatch, nextCursor]);

  const { setTrigger } = useInfiniteScroll({
    canLoadMore: hasMore,
    isLoading,
    onLoadMore,
  });

  return (
    <div className="relative flex flex-col min-h-full">
      <Typography
        variant="h1"
        type={TypographyTypes.BLOCK_TITLE}
        bold
        className="toolbar sticky top-0 z-10"
      >
        Notifications
      </Typography>

      <div className="px-main py-main flex flex-col gap-1 flex-1">
      {hasNew && (
        <div className="flex items-center justify-between p-3 mb-2 rounded-xl bg-blue-b4/30 text-sm">
          <span>New notifications arrived</span>
          <button
            className="font-semibold text-blue-b1 hover:underline"
            onClick={onRefresh}
          >
            Refresh
          </button>
        </div>
      )}

      {notifications.length === 0 && !isLoading && (
        <p className="text-center text-gray-g2 mt-10">No notifications yet</p>
      )}

      {notifications.map((n) => (
        <NotificationItem key={n.id} notification={n} />
      ))}

      {isLoading && notifications.length > 0 && (
        <p className="text-center text-gray-g2 text-sm py-2">Loading more…</p>
      )}

      <div ref={setTrigger} />
      </div>
    </div>
  );
});

NotificationsPage.displayName = 'NotificationsPage';

export default NotificationsPage;
