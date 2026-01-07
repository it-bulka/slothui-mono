import { useEffect, type RefObject } from 'react';

interface UseInfiniteScrollProps {
  triggerRef: RefObject<HTMLElement | null>;
  wrapperRef: RefObject<HTMLElement | null>;
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const useInfiniteScroll = ({
  triggerRef,
  wrapperRef,
  isLoading,
  hasMore,
  onLoadMore,
}: UseInfiniteScrollProps) => {
  useEffect(() => {
    if (!triggerRef.current || !wrapperRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading && hasMore) {
          onLoadMore();
        }
      },
      { root: wrapperRef.current, rootMargin: '0px', threshold: 0.1 }
    );

    observer.observe(triggerRef.current);

    return () => observer.disconnect();
  }, [triggerRef, wrapperRef, isLoading, hasMore, onLoadMore]);
};
