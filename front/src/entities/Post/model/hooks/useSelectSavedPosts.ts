import { useAppSelector } from '@/shared/config/redux';
import { selectPostsByIds } from '../selectors/selectPostsByIds.ts';

export const useSelectSavedPosts = () => {
  const savedPostsIds = useAppSelector(
    state => state.posts.saves.ids ?? []
  )

  const posts = useAppSelector(state =>
    selectPostsByIds(state, savedPostsIds)
  )

  return { posts }
}