import { useAppSelector } from '@/shared/config/redux';
import { selectPostsByIds } from '../selectors/selectPostsByIds.ts';

export const useSelectProfilePosts = (userId?: string) => {
  const profileIds = useAppSelector(
    state => (userId && state.posts.profile[userId]?.ids) ?  state.posts.profile[userId]?.ids : []
  )

  const posts = useAppSelector(state =>
    selectPostsByIds(state, profileIds)
  )

  return { posts}
}