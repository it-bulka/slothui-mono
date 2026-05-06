import { memo } from 'react';
import { useNavigate } from 'react-router';
import { Typography } from '../Typography/Typography.tsx';
import { AvatarWithInfo } from '../Avatar/AvatarWithInfo.tsx';
import { getPostPage } from '@/shared/config/routeConfig/routeConfig.tsx';

const TITLES: Record<'like' | 'comment', string> = {
  like: 'New like on your post',
  comment: 'New comment on your post',
};

interface NotificationToastProps {
  type: 'like' | 'comment';
  actor: { id: string; username: string; nickname: string; avatarUrl?: string | null };
  entityId?: string;
}

export const NotificationToast = memo(({ type, actor, entityId }: NotificationToastProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => entityId && navigate(getPostPage(entityId))}
      style={{ cursor: entityId ? 'pointer' : 'default' }}
    >
      <Typography bold>{TITLES[type]}</Typography>
      <AvatarWithInfo
        src={actor.avatarUrl ?? undefined}
        name={`@${actor.nickname}`}
        position={actor.username}
      />
    </div>
  );
});
