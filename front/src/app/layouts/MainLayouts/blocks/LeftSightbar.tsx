import { useState, memo, useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { UserAuth } from '@/features';
import { ScrollableBlock, Logo, Divider, Overlay } from '@/shared/ui';
import { NavigationSearchBar, NavBar } from '@/widgets';
import { useMediaQuery } from '@/shared/hooks';
import classnames from 'classnames';
import LogoSvg from '@/shared/assets/images/logo.svg?react';
import { SidebarCloseButton } from './SidebarCloseButton';
import { useSidebarContext } from '../SidebarContext.ts';

const useCloseOnNavigate = (onClose: () => void) => {
  const { pathname } = useLocation();
  const onCloseRef = useRef(onClose);
  useLayoutEffect(() => { onCloseRef.current = onClose; });
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    onCloseRef.current();
  }, [pathname]);
};

const COLLAPSED_WIDTH = 72;
const EXPANDED_WIDTH = 260;

export const LeftSidebarContent = () => {
  const { close } = useSidebarContext();
  const isCompact = useMediaQuery('(max-width: 1279px)');
  useCloseOnNavigate(() => { if (isCompact) close(); });

  return (
    <aside aria-label="Sidebar navigation" className="px-4 py-8 flex flex-col gap-4 h-full overflow-y-auto scrollbar-hide">
      <div className="flex items-center justify-between">
        <Logo />
        <SidebarCloseButton />
      </div>
      <NavigationSearchBar />
      <ScrollableBlock className="grow">
        <NavBar />
        <Divider className="my-6" />
        <UserAuth />
      </ScrollableBlock>
    </aside>
  );
};

const SidebarInner = ({ collapsed }: { collapsed?: boolean }) => (
  <>
    <div className={classnames('flex items-center font-extrabold text-3xl overflow-hidden', collapsed ? 'justify-center' : '')}>
      <LogoSvg className="shrink-0" />
      {!collapsed && <p className="whitespace-nowrap">slothui</p>}
    </div>

    {!collapsed && <NavigationSearchBar />}

    <ScrollableBlock className="grow">
      <NavBar collapsed={collapsed} />
      {!collapsed && <Divider className="my-6" />}
      <UserAuth collapsed={collapsed} />
    </ScrollableBlock>
  </>
);

export const LeftSidebar = memo(() => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isTablet = useMediaQuery('(max-width: 1279px) and (min-width: 640px)');
  useCloseOnNavigate(() => { if (isTablet) setIsExpanded(false); });

  if (!isTablet) {
    return (
      <aside className="px-4 py-8 flex flex-col gap-4 border-style-r bg-light-l2 h-screen overflow-y-auto scrollbar-hide">
        <Logo />
        <NavigationSearchBar />
        <ScrollableBlock className="grow">
          <NavBar />
          <Divider className="my-6" />
          <UserAuth />
        </ScrollableBlock>
      </aside>
    );
  }

  return (
    <>
      {isExpanded && <Overlay onClick={() => setIsExpanded(false)} />}

      <div
        className={classnames(
          'fixed left-0 top-0 h-screen',
          isExpanded ? 'z-[var(--z-index-sidebar)]' : 'z-50',
        )}
        style={{
          width: isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
          transition: 'width 300ms ease-in-out',
        }}
      >
        <button
          onClick={() => setIsExpanded(v => !v)}
          className="absolute top-4 right-0 translate-x-1/2 z-10 bg-light-l2 border border-gray-g3 rounded-full w-6 h-6 flex items-center justify-center shadow-sm text-gray-g1 hover:text-blue-b1 transition-colors"
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <svg
            className={classnames('w-3 h-3 transition-transform duration-300', { 'rotate-180': isExpanded })}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <aside
          className="w-full h-full bg-light-l2 border-style-r flex flex-col gap-4 py-8 overflow-y-auto scrollbar-hide"
          style={{
            paddingLeft: isExpanded ? '1rem' : '0.75rem',
            paddingRight: isExpanded ? '1rem' : '0.75rem',
            transition: 'padding 300ms ease-in-out',
          }}
        >
          <SidebarInner collapsed={!isExpanded} />
        </aside>
      </div>
    </>
  );
});

LeftSidebar.displayName = 'LeftSidebar';
