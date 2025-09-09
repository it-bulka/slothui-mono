import { useState, useCallback, type MouseEvent, useLayoutEffect, type ReactNode, memo, useId } from 'react';
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
}

export const Tab = memo(({
  tabs,
  contents,
  activeTabIndex,
  contentClassName,
  tabClassName
}: TabProps) => {
  const [underlinePosition, setUnderlinePosition] = useState({ left: 0, top: 0, width: 0 });
  const [activeElId, setActiveElId] = useState<ActiveTabIndex>(activeTabIndex || 0);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const id = useId()

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
  }, [setRect, setActiveElId])


  useLayoutEffect(() => {
    const activeEl = document.getElementById(`${id}-${activeElId}`)

    if(!activeEl) return
    setRect(activeEl)
    requestAnimationFrame(() => {
      setIsFirstRender(false);
    })
  }, [activeElId, setRect, id, setIsFirstRender]);

  return (
    <>
      <div className="flex justify-stretch cursor-children">
        {tabs?.map((tab, index) => (
          <button
            onClick={onActiveElClick(index, checkActive(index))}
            className={twMerge("border-style-b grow px-6 py-5", tabClassName)}
            id={`${id}-${index}`}
          >
            {tab}
          </button>
        ))}

        <div
          className={classnames("fixed h-[1px] bg-blue-b1 transition-[width,left,top] will-change-transform -translate-y-full", { "duration-500": !isFirstRender })}
          style={{ width: underlinePosition.width, left: underlinePosition.left, top: underlinePosition.top }}/>
      </div>

      <div className="grid overflow-hidden">
        {contents?.map((content, index) => (
          <div
            className={twMerge(`bg-white ${cls.content} ${cls.active} ${cls.inactive}`, contentClassName)}
            data-active={activeElId === index}
          >
            {content}
          </div>
        ))}
      </div>
    </>

  )
})