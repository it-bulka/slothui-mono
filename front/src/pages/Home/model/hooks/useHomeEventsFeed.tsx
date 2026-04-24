import { useAppDispatch } from '@/shared/config/redux';
import { useSelectHomeEventsMeta } from '@/entities';
import { useCallback } from 'react';
import { fetchAllEventsThunk } from '@/entities';
import { useInfiniteScroll } from '@/shared/hooks';

export const useHomeEventsFeed = () => {
  const dispatch = useAppDispatch();
  const { hasMore, isLoading, nextCursor } = useSelectHomeEventsMeta();

  const loadMore = useCallback(() => {
    if (!nextCursor) return;
    dispatch(fetchAllEventsThunk({ cursor: nextCursor }));
  }, [dispatch, nextCursor]);

  const {setTrigger} = useInfiniteScroll({
    canLoadMore: hasMore,
    isLoading,
    onLoadMore: loadMore
  });

  return { setTrigger, isLoading }
};