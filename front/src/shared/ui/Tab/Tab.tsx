import { useState, useCallback, useEffect, useRef, type MouseEvent, useLayoutEffect, type ReactNode, memo, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import cls from "./Tab.module.css"
import classnames from 'classnames';

type ActiveTabIndex = number
interface TabProps {
  tabs: ReactNode[]
  contents: ReactNode[]
  activeTabIndex?: ActiveTabIndex
  contentClassName?: string
  tabClassName?: string
  onTabChange?: (index: ActiveTabIndex) => void
  animated?: boolean
  scrollableTabs?: boolean
  scrollableContent?: boolean
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
}: TabProps) => {
  const [underlinePosition, setUnderlinePosition] = useState({ left: 0, top: 0, width: 0 });
  const [activeElId, setActiveElId] = useState<ActiveTabIndex>(activeTabIndex ?? 0);

  useEffect(() => {
    if (activeTabIndex !== undefined && activeTabIndex !== activeElId) {
      setActiveElId(activeTabIndex);
    }
  }, [activeElId, activeTabIndex]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const id = useId()

  const contentContainerRef = useRef<HTMLDivElement>(null)
  const [scrollableHeight, setScrollableHeight] = useState(0)

  useLayoutEffect(() => {
    if (!scrollableContent) return
    const el = contentContainerRef.current
    if (!el) return
    const parent = el.parentElement!

    const update = () => {
      const pb = parseFloat(getComputedStyle(parent).paddingBottom) || 0
      setScrollableHeight(Math.max(0, window.innerHeight - el.getBoundingClientRect().top - pb))
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(parent)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [scrollableContent])

  const checkActive = (id: ActiveTabIndex) => activeElId === id

  const setRect = useCallback((el: HTMLElement) => {
    const { x, y, width, height } = el.getBoundingClientRect();

    setUnderlinePosition({ left: x, top: y + height, width: width });
  }, [setUnderlinePosition])

  const onActiveElClick = useCallback((id: ActiveTabIndex, isActive: boolean, ) => (e: MouseEvent<HTMLButtonElement>) => {
    if(isActive) return;
    const el = e.target as HTMLElement;
    setRect(el)
    setActiveElId(id)
    onTabChange?.(id)
  }, [setRect, setActiveElId, onTabChange])


  useLayoutEffect(() => {
    const activeEl = document.getElementById(`${id}-${activeElId}`)

    if(!activeEl) return
    setRect(activeEl)
    requestAnimationFrame(() => {
      setIsFirstRender(false);
    })
  }, [activeElId, setRect, id, setIsFirstRender]);

  const tabButtons = (
    <>
      {tabs?.map((tab, index) => (
        <button
          onClick={onActiveElClick(index, checkActive(index))}
          className={twMerge("border-style-b shrink-0 grow px-6 py-5", tabClassName)}
          id={`${id}-${index}`}
          key={`${id}-${index}`}
        >
          {tab}
        </button>
      ))}

      <div
        className={classnames("fixed h-[1px] bg-blue-b1 transition-[width,left,top] will-change-transform -translate-y-full", { "duration-500": !isFirstRender })}
        style={{ width: underlinePosition.width, left: underlinePosition.left, top: underlinePosition.top }}/>
    </>
  )

  const tabNav = scrollableTabs ? (
    <nav className="overflow-x-auto scrollbar-none">
      <div className="flex min-w-max cursor-children">{tabButtons}</div>
    </nav>
  ) : (
    <div className="flex justify-stretch cursor-children">{tabButtons}</div>
  )

  const contentContainerClass = scrollableContent
    ? "relative overflow-hidden"
    : "grid overflow-hidden"

  const contentItemClass = scrollableContent
    ? `bg-white ${cls.content} ${cls.scrollable} ${cls.active} ${cls.inactive}`
    : `bg-white ${cls.content} ${cls.active} ${cls.inactive}`

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
      ) : contents?.map((content) => content)}
    </>
  )
})