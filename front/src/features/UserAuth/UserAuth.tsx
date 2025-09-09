import { Button, AvatarWithInfo } from '@/shared/ui';
import ExitSvg from '@/shared/assets/images/general/exit.svg?react'
import AvatarImg from '@/mock/images/avatar.png'

export const UserAuth = () => {
  return (
    <div className="flex items-center">
      <AvatarWithInfo src={AvatarImg} name={'name'} position={"position"} className="grow"/> //TODO: add name
      <Button className={"p-4 text-gray-g1 w-[40px]"} variant="transparent">
        <ExitSvg />
      </Button>
    </div>
  )
}