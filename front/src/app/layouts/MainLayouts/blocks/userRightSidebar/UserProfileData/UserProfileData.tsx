import { AvatarWithStatus, Typography, TypographyTypes } from '@/shared/ui';
import { memo } from 'react';

interface UserProfileDataProps {
  avatarSrc?: string | null;
  name: string;
  nickname: string;
}

export const UserProfileData = memo(({
  avatarSrc, nickname, name
}: UserProfileDataProps) => {
  // TODO: add websocket for online status
  const isOnline = true

  return (
    <div>
      <AvatarWithStatus src={avatarSrc} isOnline={isOnline} className="mb-4 ml-auto mr-auto"/>
      <Typography className="text-center" bold type={TypographyTypes.P_SM}>{name}</Typography>
      <Typography className="text-center" type={TypographyTypes.P_SM}>{nickname}</Typography>
    </div>
  )
})

UserProfileData.displayName = 'UserProfileData'