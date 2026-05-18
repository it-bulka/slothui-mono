import { Button } from '@/shared/ui/Button/Button'
import { AvatarWithInfo } from '@/shared/ui/Avatar/AvatarWithInfo';
import ExitSvg from '@/shared/assets/images/general/exit.svg?react'
import { memo } from 'react';
import { useLogout } from '@/entities/AuthUser';
import { useAuthUserSelector } from '@/entities/AuthUser';

export const UserAuth = memo(({ collapsed }: { collapsed?: boolean }) => {
  const { logout } = useLogout();
  const authUser = useAuthUserSelector();
  if (!authUser) return null;

  if (collapsed) {
    return (
      <div className="flex justify-center">
        <Button
          className="p-4 text-gray-g1 w-[40px]"
          variant="transparent"
          onClick={logout}
        >
          <ExitSvg />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <AvatarWithInfo src={authUser.avatarUrl} name={`@${authUser.nickname}`} position={authUser.username} className="grow" />
      <Button
        className="p-4 text-gray-g1 w-[40px]"
        variant="transparent"
        onClick={logout}
      >
        <ExitSvg />
      </Button>
    </div>
  );
});

UserAuth.displayName = 'UserAuth';
