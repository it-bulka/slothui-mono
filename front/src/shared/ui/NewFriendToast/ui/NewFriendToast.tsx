import type { NewFriendNotification } from '../../../types';
import { useNavigate } from 'react-router';
import { getUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import { Typography } from '../../Typography/Typography.tsx';
import { AvatarWithInfo } from '../../Avatar/AvatarWithInfo.tsx';
import { memo } from 'react';

export const NewFriendToast = memo(({ friend }: { friend: NewFriendNotification}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(getUserPage(friend.id))}
      style={{ cursor: 'pointer' }}
    >
      <Typography bold>New follower</Typography>
      <AvatarWithInfo
        src={friend.avatarSrc}
        name={`@${friend.nickname}`}
        position={friend.username}
      />
    </div>
  );
});
