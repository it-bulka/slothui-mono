import { AvatarWithStatus } from '@/shared/ui/Avatar/AvatarWithStatus'
import { Typography } from '@/shared/ui/Typography/Typography'
import { TypographyTypes } from '@/shared/ui/Typography/typography.types';
import { memo } from 'react';

interface UserProfileDataProps {
  avatarSrc?: string | null;
  username: string;
  nickname: string;
  twoColumn?: boolean;
}

export const UserProfileData = memo(({
  avatarSrc, nickname, username, twoColumn
}: UserProfileDataProps) => {
  // TODO: add websocket for online status
  const isOnline = true

  return (
    <div className={twoColumn ? 'flex items-center gap-3' : ''}>
      <AvatarWithStatus src={avatarSrc} isOnline={isOnline} className={twoColumn ? '' : 'mb-4 ml-auto mr-auto'}/>
      <div className={twoColumn ? 'flex flex-col justify-center flex-1' : ''}>
        <Typography bold type={TypographyTypes.P_SM} className={twoColumn ? '' : 'text-center'}>{username}</Typography>
        <Typography type={TypographyTypes.P_SM} className={twoColumn ? '' : 'text-center'}>{nickname}</Typography>
      </div>
    </div>
  )
})

UserProfileData.displayName = 'UserProfileData'
