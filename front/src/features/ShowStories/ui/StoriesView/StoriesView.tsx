import { useEffect, useRef, useState, memo, type ReactNode } from 'react';
import type { UserStories } from '@/shared/libs/services';
import { Story, useMarkStoriesViewedLocally, useAuthUserSelector } from '@/entities';
import { Avatar, MoreButton } from '@/shared/ui';
import { StoryProgress } from '../StoryProgress/StoryProgress.tsx';
import { CommentStory } from '@/features/CommentStory';
import { useDeleteStory, DeleteStoryModal, StoryActionsMenu } from '@/features/DeleteStory';
import { Link } from 'react-router';
import { getUserPage } from '@/shared/config/routeConfig/routeConfig.tsx';
import {
  useSwitchStories,
  useSelectStoryData,
  useClickStory,
  usePressEvent,
  usePrefetchNextUserStories,
  useStoryBuffer
} from '../../model';

const PauseWhileMounted = ({ onMount, onUnmount, children }: { onMount: () => void; onUnmount: () => void; children: ReactNode }) => {
  const onMountRef = useRef(onMount);
  const onUnmountRef = useRef(onUnmount);
  useEffect(() => {
    const onMountFn = onMountRef.current;
    const onUnmountFn = onUnmountRef.current;

    onMountFn();

    return () => onUnmountFn();
  }, []);

  return <>{children}</>;
};

interface StoriesView {
  onStoriesEnd?: () => void;
  allStories: UserStories[]
  startUserIndex?: number | null;
}

export const StoriesView = memo(({ onStoriesEnd, allStories, startUserIndex }: StoriesView) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0)
  const [currentUserIndex, setCurrentUserIndex] = useState<number>(startUserIndex || 0)
  const viewedStories = useRef<Record<string, string>>({})
  const [isPaused, setIsPaused] = useState(false)
  const authUser = useAuthUserSelector()
  const { markStoryViewedLocally } = useMarkStoriesViewedLocally()
  const { confirmStoryId, requestDelete, cancelDelete, confirmDelete } = useDeleteStory()

  const { prevStory, nextStory } = useSwitchStories({
    setCurrentStoryIndex,
    setCurrentUserIndex,
    allStories,
    currentStoryIndex,
    currentUserIndex,
    onStoriesEnd
  })

  const { storyData, storyId, userId } = useSelectStoryData({
    nextStory,
    currentStoryIndex,
    currentUserIndex,
    viewedStories,
    allStories
  })

  const { evenStory, oddStory, activeSlot, pendingSlot, handleReady } = useStoryBuffer(storyData)

  usePrefetchNextUserStories({
    storiesData: allStories,
    currentUserIndex
  })

  useEffect(() => {
    const userStories = allStories[currentUserIndex]
    const nextUrl =
      userStories?.stories?.[currentStoryIndex + 1]?.url ??
      allStories[currentUserIndex + 1]?.stories?.[0]?.url
    if (nextUrl) {
      const img = new Image()
      img.src = nextUrl
    }
  }, [allStories, currentUserIndex, currentStoryIndex])

  const stopStory = () => {}

  const { isPress, handleMouseDown, handleMouseUp } = usePressEvent({
    onPress: stopStory,
  });

  const { handleClick } = useClickStory({
    onLeftClick: prevStory,
    onRightClick: nextStory,
    isPress
  });

  const isAuthor = !!storyData && !!authUser && storyData.userId === authUser.id

  return (
    <div
      className="relative h-[80vh] max-w-[80vh] aspect-[3/4] mx-auto overflow-hidden rounded-2xl bg-black"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Even slot */}
      <div className={`absolute inset-0 ${activeSlot !== 'even' ? 'invisible pointer-events-none' : ''}`}>
        {evenStory && (
          <Story
            key={evenStory.id}
            id={evenStory.id}
            url={evenStory.url}
            type={evenStory.type}
            duration={evenStory.duration}
            isPaused={activeSlot !== 'even' || isPaused}
            onStart={activeSlot === 'even' ? () => markStoryViewedLocally(evenStory.id) : undefined}
            onComplete={activeSlot === 'even' ? nextStory : undefined}
            onReady={pendingSlot === 'even' ? handleReady : undefined}
          >
            {activeSlot === 'even' && <CommentStory storyId={storyId} userId={userId} />}
          </Story>
        )}
      </div>

      {/* Odd slot */}
      <div className={`absolute inset-0 ${activeSlot !== 'odd' ? 'invisible pointer-events-none' : ''}`}>
        {oddStory && (
          <Story
            key={oddStory.id}
            id={oddStory.id}
            url={oddStory.url}
            type={oddStory.type}
            duration={oddStory.duration}
            isPaused={activeSlot !== 'odd' || isPaused}
            onStart={activeSlot === 'odd' ? () => markStoryViewedLocally(oddStory.id) : undefined}
            onComplete={activeSlot === 'odd' ? nextStory : undefined}
            onReady={pendingSlot === 'odd' ? handleReady : undefined}
          >
            {activeSlot === 'odd' && <CommentStory storyId={storyId} userId={userId} />}
          </Story>
        )}
      </div>

      {isAuthor && (
        <div className="absolute top-2 right-2 z-20" onClick={(e) => e.stopPropagation()}>
          <MoreButton
            moreBtnClass="text-gray-800 bg-white/25 rounded-md px-0.5 py-1.5 backdrop-blur-sm"
            content={
              <PauseWhileMounted onMount={() => setIsPaused(true)} onUnmount={() => setIsPaused(false)}>
                <StoryActionsMenu onDelete={() => requestDelete(storyData!.id)} />
              </PauseWhileMounted>
            }
          />
        </div>
      )}

      <Link to={getUserPage(userId)} className="absolute top-2 left-2 z-20">
        <Avatar src={allStories[currentUserIndex].avatar} />
      </Link>

      <StoryProgress
        amount={allStories[currentUserIndex].stories.length}
        activeIndex={currentStoryIndex}
      />

      <DeleteStoryModal
        isOpen={!!confirmStoryId}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  )
})

StoriesView.displayName = 'StoriesView'
