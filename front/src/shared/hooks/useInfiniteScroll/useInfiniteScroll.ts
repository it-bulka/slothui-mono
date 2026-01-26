import { useEffect, type RefObject, useRef, useState, useCallback } from 'react';

interface UseInfiniteScrollProps {
  wrapperRef?: RefObject<HTMLElement | null>;
  canLoadMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}

export const useInfiniteScroll = ({
  wrapperRef,
  canLoadMore,
  isLoading,
  onLoadMore,
}: UseInfiniteScrollProps) => {
  const [isTriggered, setIsTriggered] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef(onLoadMore);

  useEffect(() => {
    loadMoreRef.current = onLoadMore
  }, [onLoadMore])

  useEffect(() => {
    if(canLoadMore && !isLoading && isTriggered) {
      loadMoreRef.current?.()
    }
  }, [canLoadMore, isLoading, isTriggered]);

  const setTrigger = useCallback((node: HTMLElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;
    setIsTriggered(false);

    if(!node) return;

    const root = wrapperRef?.current ?? null;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsTriggered(entry.isIntersecting);
      },
      { root, rootMargin: '0px', threshold: 0.1 }
    );

    observerRef.current.observe(node);
  }, [wrapperRef, setIsTriggered])

  return { setTrigger };
};
