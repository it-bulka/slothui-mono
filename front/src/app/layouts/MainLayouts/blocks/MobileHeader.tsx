import { memo } from 'react';
import { NotificationAction } from '@/features/NotificationAction';
import { MessageAction } from '@/features/MessageAction';
import { ThemeToggleAction } from '@/features/ThemeToggleAction';
import { AvatarWithStatus } from '@/shared/ui/Avatar/AvatarWithStatus';
import { useAuthUserSelector } from '@/entities/AuthUser';
import { useSidebarContext } from '../SidebarContext.ts';
import classnames from 'classnames';
import LogoSvg from '@/shared/assets/images/logo2.svg?react';

interface MobileHeaderProps {
  className?: string;
}

export const MobileHeader = memo(({ className }: MobileHeaderProps) => {
  const { openLeft, openRight } = useSidebarContext();
  const userData = useAuthUserSelector();

  return (
    <header className={classnames('flex items-center justify-between px-4 py-3 header-glass border-style-b', className)}>
      <button
        onClick={openLeft}
        aria-label="Open navigation menu"
        className="p-1 text-svg-secondary hover:text-blue-b1 transition-colors"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex items-center font-extrabold text-xl">
        <LogoSvg aria-hidden="true" className="w-7 h-7" />
        <span>slothui</span>
      </div>

      <div className="flex items-center gap-1 text-svg-secondary">
        <ThemeToggleAction />
        <NotificationAction />
        <MessageAction />
        {userData && (
          <button
            onClick={openRight}
            aria-label="Open profile panel"
            className="ml-1"
          >
            <AvatarWithStatus
              src={userData.avatarUrl}
              name={userData.nickname}
              isOnline={true}
              className="cursor-pointer"
            />
          </button>
        )}
      </div>
    </header>
  );
});

MobileHeader.displayName = 'MobileHeader';
