import { useAppSelector } from '@/shared/config/redux';
import { selectPostsByIds } from '../selectors/selectPostsByIds.ts';

export const useSelectFeedPosts = () => {
  const feedIds = useAppSelector(
    state => state.posts.home.ids ?? []
  )

  const posts = useAppSelector(state =>
    selectPostsByIds(state, feedIds)
  )

  return { posts}
}