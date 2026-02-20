import { Button, AvatarWithInfo } from '@/shared/ui';
import ExitSvg from '@/shared/assets/images/general/exit.svg?react'
import { memo } from 'react';
import { useLogout } from '@/entities';
import { useAuthUserSelector } from '@/entities/AuthUser';

export const UserAuth = memo(() => {
  const { logout } = useLogout()
  const authUser = useAuthUserSelector()
  if(!authUser) return null;
  return (
    <div className="flex items-center">
      <AvatarWithInfo src={authUser.avatarUrl} name={`@${authUser.nickname}`} position={authUser.username} className="grow"/>
      <Button
        className={"p-4 text-gray-g1 w-[40px]"}
        variant="transparent"
        onClick={logout}
      >
        <ExitSvg />
      </Button>
    </div>
  )
})
UserAuth.displayName = 'UserAuth'