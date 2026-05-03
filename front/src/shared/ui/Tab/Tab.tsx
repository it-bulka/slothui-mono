import { useState, useCallback, useEffect, useRef, type MouseEvent, useLayoutEffect, type ReactNode, memo, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import cls from './Tab.module.css';
import classnames from 'classnames';

type ActiveTabIndex = number;

interface TabProps {
  tabs: ReactNode[];
  contents: ReactNode[];
  activeTabIndex?: ActiveTabIndex;
  contentClassName?: string;
  tabClassName?: string;
  onTabChange?: (index: ActiveTabIndex) => void;
  animated?: boolean;
  scrollableTabs?: boolean;
  scrollableContent?: boolean;
  sticky?: boolean;
}

export const Tab = memo(({
  tabs,
  contents,
  activeTabIndex,
  contentClassName,
  tabClassName,
  onTabChange,
  animated = true,
  scrollableTabs = false,
  scrollableContent = false,
  sticky = false,
}: TabProps) => {
  const [underlinePosition, setUnderlinePosition] = useState({ left: 0, width: 0 });
  const tabNavRef = useRef<HTMLDivElement>(null);
  const [activeElId, setActiveElId] = useState<ActiveTabIndex>(activeTabIndex ?? 0);

  useEffect(() => {
    if (activeTabIndex !== undefined) {
      setActiveElId(activeTabIndex);
    }
  }, [activeTabIndex]);

  const [isFirstRender, setIsFirstRender] = useState(true);
  const id = useId();

  const contentContainerRef = useRef<HTMLDivElement>(null);
  const [scrollableHeight, setScrollableHeight] = useState(0);

  useLayoutEffect(() => {
    if (!scrollableContent) return;

    const el = contentContainerRef.current;
    if (!el) return;

    if (sticky) {
      const navEl = tabNavRef.current;
      const update = () => {
        const navHeight = navEl ? navEl.getBoundingClientRect().height : 0;
        setScrollableHeight(Math.max(0, window.innerHeight - navHeight));
      };
      update();
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }

    const parent = el.parentElement!;
    const update = () => {
      const pb = parseFloat(getComputedStyle(parent).paddingBottom) || 0;
      setScrollableHeight(Math.max(0, window.innerHeight - el.getBoundingClientRect().top - pb));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(parent);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [scrollableContent, sticky]);

  const checkActive = (id: ActiveTabIndex) => activeElId === id;

  const setRect = useCallback((el: HTMLElement) => {
    const { x, width } = el.getBoundingClientRect();
    const containerX = tabNavRef.current?.getBoundingClientRect().x ?? 0;
    setUnderlinePosition({ left: x - containerX, width });
  }, []);

  const onActiveElClick = useCallback(
    (id: ActiveTabIndex, isActive: boolean) => (e: MouseEvent<HTMLButtonElement>) => {
      if (isActive) return;
      const el = e.target as HTMLElement;
      setRect(el);
      setActiveElId(id);
      onTabChange?.(id);
    },
    [setRect, onTabChange]
  );

  useLayoutEffect(() => {
    const activeEl = document.getElementById(`${id}-${activeElId}`);
    if (!activeEl) return;
    setRect(activeEl);
    requestAnimationFrame(() => setIsFirstRender(false));
  }, [activeElId, setRect, id]);

  const tabButtons = (
    <>
      {tabs?.map((tab, index) => (
        <button
          onClick={onActiveElClick(index, checkActive(index))}
          className={twMerge('border-style-b shrink-0 grow px-6 py-5', tabClassName)}
          id={`${id}-${index}`}
          key={`${id}-${index}`}
        >
          {tab}
        </button>
      ))}
      <div
        className={classnames('absolute bottom-0 h-[1px] bg-blue-b1 transition-[width,left]', {
          'duration-500': !isFirstRender,
        })}
        style={{ width: underlinePosition.width, left: underlinePosition.left }}
      />
    </>
  );

  const tabNavInner = scrollableTabs ? (
    <nav className="overflow-x-auto scrollbar-none">
      <div ref={tabNavRef} className="relative flex min-w-max cursor-children">
        {tabButtons}
      </div>
    </nav>
  ) : (
    <div ref={tabNavRef} className="relative flex justify-stretch cursor-children">
      {tabButtons}
    </div>
  );

  const tabNav = sticky ? (
    <div className="sticky top-0 z-10 bg-white">{tabNavInner}</div>
  ) : tabNavInner;

  const contentContainerClass = scrollableContent ? 'relative overflow-hidden' : 'grid overflow-hidden';
  const contentItemClass = scrollableContent
    ? `bg-white ${cls.content} ${cls.scrollable} ${cls.active} ${cls.inactive}`
    : `bg-white ${cls.content} ${cls.active} ${cls.inactive}`;

  return (
    <>
      {tabNav}
      {animated ? (
        <div
          ref={contentContainerRef}
          className={contentContainerClass}
          style={scrollableContent ? { height: scrollableHeight || undefined } : undefined}
        >
          {contents?.map((content, index) => (
            <div
              className={twMerge(contentItemClass, contentClassName)}
              data-active={activeElId === index}
              key={index}
            >
              {content}
            </div>
          ))}
        </div>
      ) : (
        contents?.map((content) => content)
      )}
    </>
  );
});
