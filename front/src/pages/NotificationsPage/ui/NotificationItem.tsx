import { memo } from 'react';
import { Avatar } from '@/shared/ui';
import type { Notification, NotificationType } from '@/entities/Notification';

const TYPE_ICON: Record<NotificationType, string> = {
  like: '❤️',
  comment: '💬',
  follow: '👤',
  system: '🔔',
};

const TYPE_LABEL: Record<NotificationType, string> = {
  like: 'liked your post',
  comment: 'commented on your post',
  follow: 'started following you',
  system: 'system notification',
};

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

interface NotificationItemProps {
  notification: Notification;
}

export const NotificationItem = memo(({ notification }: NotificationItemProps) => {
  const { type, actor, entityTitle, createdAt, read } = notification;

  return (
    <div
      className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${
        read ? '' : 'bg-blue-b4/20 border-l-2 border-blue-b1'
      }`}
    >
      <div className="relative shrink-0">
        <Avatar
          src={actor?.avatarUrl}
          name={actor?.nickname}
          size="sm"
        />
        <span className="absolute -bottom-1 -right-1 text-xs leading-none">
          {TYPE_ICON[type]}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-tight truncate">
          {actor?.nickname ?? actor?.username ?? 'Someone'}
        </p>
        <p className="text-sm text-gray-g2 leading-tight">
          {TYPE_LABEL[type]}
          {entityTitle && (
            <span className="ml-1 font-medium text-primary truncate">
              · {entityTitle}
            </span>
          )}
        </p>
      </div>

      <span className="text-xs text-gray-g2 shrink-0 mt-0.5">
        {formatRelativeTime(createdAt)}
      </span>
    </div>
  );
});

NotificationItem.displayName = 'NotificationItem';
