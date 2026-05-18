import { StoryAvatar } from '@/entities/StoryAvatar';
import ArrowRightSvg from '@/shared/assets/images/general/arrow-right.svg?react'
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';
import { StoryModal } from '../StoriesModal/StoriesModal.tsx';
import { useState, useCallback, useRef, useEffect, memo } from 'react';
import type { UserStories } from '@/shared/libs/services';
import { usePrefetchStories } from '../../model/hooks/usePrefetchStories.tsx';
import { useFlushStoriesViewed, useFlushStoriesOnExit } from '@/entities/Story';

const StoryScrollButton = memo(({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-full flex items-center justify-center w-[32px] h-[32px] absolute right-0 top-1/2 -translate-y-1/2 border border-gray-g3 shadow-2xl shadow-gray-g3">
      <ArrowRightSvg />
    </button>
  )
})

StoryScrollButton.displayName = 'StoryScrollButton';

export const Stories = memo(({ stories, hideUsername }: { stories: UserStories[]; hideUsername?: boolean }) => {
  const { isOpen, close, open } = useModalControl(false)
  const [clickedAvatarIndex, setClickedAvatarIndex] = useState<number | null>(null)
  const [canScroll, setCanScroll] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { flushStoriesViewed } = useFlushStoriesViewed()

  usePrefetchStories({
    storiesToPrefetch: stories[0]?.stories ?? [],
  })

  useFlushStoriesOnExit()

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const check = () => setCanScroll(el.scrollWidth - el.scrollLeft - el.clientWidth > 1)
    check()
    el.addEventListener('scroll', check)
    const ro = new ResizeObserver(check)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', check)
      ro.disconnect()
    }
  }, [stories])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const handleScrollClick = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const remaining = el.scrollWidth - el.scrollLeft - el.clientWidth
    el.scrollBy({ left: Math.min(el.clientWidth * 0.9, remaining), behavior: 'smooth' })
  }, [])

  const handleAvatarClick = useCallback(({ index }: { index: number }) => () => {
    setClickedAvatarIndex(index)
    open()
  }, [open])

  return (
    <>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {stories.map((story, index) => {
            return <StoryAvatar
              avatarSrc={story.avatar}
              username={hideUsername ? undefined : story.username}
              key={story.userId}
              onClick={handleAvatarClick({ index })}
            />
          })}
        </div>
        {canScroll && <StoryScrollButton onClick={handleScrollClick} />}
      </div>

      <StoryModal
        isOpen={isOpen}
        onClose={() => {
          close()
          flushStoriesViewed()
        }}
        allStories={stories}
        startUserIndex={clickedAvatarIndex}
      />
    </>
  )
})

Stories.displayName = 'Stories'
