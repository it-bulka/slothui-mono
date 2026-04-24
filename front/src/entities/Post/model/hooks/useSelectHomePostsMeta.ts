import { useAppSelector } from '@/shared/config/redux';
import { selectHomeHasMore, selectHomeIsLoading, selectHomeNextCursor } from '../selectors/homePostsSelectors.ts';

export const useSelectHomePostsMeta = () => {
  const isLoading = useAppSelector(selectHomeIsLoading)
  const hasMore = useAppSelector(selectHomeHasMore)
  const nextCursor = useAppSelector(selectHomeNextCursor)

  return { isLoading, hasMore, nextCursor }
}