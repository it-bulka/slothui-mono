import { useState, useEffect, useRef, useCallback } from 'react';
import type { StoryDTO } from '@/shared/libs/services';

type Slot = 'even' | 'odd';

export const useStoryBuffer = (storyData: StoryDTO | null) => {
  const [evenStory, setEvenStory] = useState<StoryDTO | null>(null);
  const [oddStory, setOddStory] = useState<StoryDTO | null>(null);
  const [activeSlot, setActiveSlot] = useState<Slot>('even');
  const [pendingSlot, setPendingSlot] = useState<Slot | null>(null);

  const evenStoryRef = useRef(evenStory);
  const oddStoryRef = useRef(oddStory);
  const activeSlotRef = useRef(activeSlot);
  const pendingSlotRef = useRef(pendingSlot);

  evenStoryRef.current = evenStory;
  oddStoryRef.current = oddStory;
  activeSlotRef.current = activeSlot;
  pendingSlotRef.current = pendingSlot;

  useEffect(() => {
    if (!storyData) return;

    const activeStory =
      activeSlotRef.current === 'even' ? evenStoryRef.current : oddStoryRef.current;

    if (!activeStory) {
      // First story — show immediately, no buffering
      if (activeSlotRef.current === 'even') {
        setEvenStory(storyData);
      } else {
        setOddStory(storyData);
      }
      return;
    }

    if (storyData.id === activeStory.id) {
      // User navigated back to the currently visible story — cancel any pending buffer
      setPendingSlot(null);
      if (activeSlotRef.current === 'even') {
        setOddStory(null);
      } else {
        setEvenStory(null);
      }
      return;
    }

    // New story: load into the inactive slot
    const inactiveSlot: Slot = activeSlotRef.current === 'even' ? 'odd' : 'even';
    const inactiveStory = inactiveSlot === 'even' ? evenStoryRef.current : oddStoryRef.current;

    if (inactiveStory?.id === storyData.id) {
      // Story already mounted and loaded in inactive slot — swap immediately
      setActiveSlot(inactiveSlot);
      setPendingSlot(null);
      return;
    }

    if (inactiveSlot === 'even') {
      setEvenStory(storyData);
    } else {
      setOddStory(storyData);
    }
    setPendingSlot(inactiveSlot);
  }, [storyData?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleReady = useCallback(() => {
    if (!pendingSlotRef.current) return;
    setActiveSlot(pendingSlotRef.current);
    setPendingSlot(null);
  }, []);

  return { evenStory, oddStory, activeSlot, pendingSlot, handleReady };
};
