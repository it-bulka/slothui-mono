import { useAppSelector } from '@/shared/config/redux';
import { selectPostsByIds } from '../selectors/selectPostsByIds.ts';

export const useSelectLikedPosts = () => {
  const likedPostsIds = useAppSelector(
    state => state.posts.likes.ids ?? []
  )

  const posts = useAppSelector(state =>
    selectPostsByIds(state, likedPostsIds)
  )

  return { posts}
}