import { StoryAvatar } from '@/entities';
import { Card } from '@/shared/ui';
import ArrowRightSvg from '@/shared/assets/images/general/arrow-right.svg?react'
import { mockStories } from '@/mock/data/stories.tsx';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';
import { StoryModal } from '../StoriesModal/StoriesModal.tsx';
import { useState, useEffect, useCallback } from 'react';
import type { UserStories } from '@/shared/libs/services';
import { usePrefetchStories } from '../../model/hooks/usePrefetchStories.tsx';
import { useStoriesService } from '@/shared/libs/services';

const StoryScrollButton = () => {
  return (
    <button
      className={"bg-white rounded-full flex items-center justify-center w-[32px] h-[32px] absolute right-0 top-[50%] translate-[-50%] border border-gray-g3 shadow-2xl shadow-gray-g3"}>
      <ArrowRightSvg />
    </button>
  )
}
export const Stories = () => {
  const { isOpen, close, open } = useModalControl(false)
  const [stories, setStories] = useState<UserStories[]>(mockStories || [])
  const [clickedAvatarIndex, setClickedAvatarIndex] = useState<number | null>(null)
  const storyService = useStoriesService()
  usePrefetchStories({
    storiesToPrefetch: stories[0].stories,
  })

  const handleAvatarClick = useCallback(({ index }: { index: number }) => () => {
    setClickedAvatarIndex(index)
    open()
  }, [open, setClickedAvatarIndex])

  useEffect(() => {
    //TODO: fetch
    /*storyService.listUserWithStories()
      .then(setStories)*/
  }, [storyService, setStories])

  // TODO: add Loader

  return (
    <>
      <Card onClick={open}>
        <Card.Body className="relative flex gap-1 overflow-x-hidden">
          {mockStories.map((story, index) => {
            return <StoryAvatar
              avatarSrc={story.avatar}
              username={story.username}
              key={story.userId}
              onClick={handleAvatarClick({ index })}
            />
          })}
          <StoryScrollButton />
        </Card.Body>
      </Card>

      <StoryModal
        isOpen={isOpen}
        onClose={close}
        allStories={stories}
        startUserIndex={clickedAvatarIndex}
      />
    </>
  )
}