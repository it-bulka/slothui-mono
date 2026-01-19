import { Button, AvatarWithInfo } from '@/shared/ui';
import ExitSvg from '@/shared/assets/images/general/exit.svg?react'
import AvatarImg from '@/mock/images/avatar.png'
import { memo } from 'react';
import { useLogout } from '@/entities';

export const UserAuth = memo(() => {
  const { logout } = useLogout()
  return (
    <div className="flex items-center">
      <AvatarWithInfo src={AvatarImg} name={'name'} position={"position"} className="grow"/> //TODO: add name
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