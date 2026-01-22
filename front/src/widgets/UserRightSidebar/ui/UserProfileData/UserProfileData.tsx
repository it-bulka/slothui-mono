import { AvatarWithStatus, Typography, TypographyTypes } from '@/shared/ui';
import { memo } from 'react';

interface UserProfileDataProps {
  avatarSrc?: string | null;
  username: string;
  nickname: string;
}

export const UserProfileData = memo(({
  avatarSrc, nickname, username
}: UserProfileDataProps) => {
  // TODO: add websocket for online status
  const isOnline = true

  return (
    <div>
      <AvatarWithStatus src={avatarSrc} isOnline={isOnline} className="mb-4 ml-auto mr-auto"/>
      <Typography className="text-center" bold type={TypographyTypes.P_SM}>{username}</Typography>
      <Typography className="text-center" type={TypographyTypes.P_SM}>{nickname}</Typography>
    </div>
  )
})

UserProfileData.displayName = 'UserProfileData'