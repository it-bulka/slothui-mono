import { NoDataYet } from '@/shared/ui/NoDataYet/NoDataYet'
import noPostsImage from '@/shared/assets/images/general/no_posts_2.png'
import { useNavigate } from 'react-router'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';

export const NoUserPostsYet = () => {
  const navigate = useNavigate()

  return (
    <NoDataYet
      image={noPostsImage}
      title="No any posts yet"
      subtitle="This user hasn't created any posts yet"
      buttonLabel="Explore other users' posts"
      onButtonClick={() => navigate(RoutePaths.home, { state: { activeTab: 0 } })}
    />
  )
}
