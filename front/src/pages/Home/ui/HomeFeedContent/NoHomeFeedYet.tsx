import { NoDataYet } from '@/shared/ui/NoDataYet/NoDataYet'
import noPostsImage from '@/shared/assets/images/general/no_posts_2.png'

export const NoHomeFeedYet = () => (
  <NoDataYet
    image={noPostsImage}
    title="No any posts yet"
    subtitle="No posts have been created yet"
  />
)
