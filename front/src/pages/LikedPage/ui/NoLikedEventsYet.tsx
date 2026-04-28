import { NoDataYet } from '@/shared/ui'
import noEventsImage from '@/shared/assets/images/general/no_events_2.png'
import { useNavigate } from 'react-router'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx'

export const NoLikedEventsYet = () => {
  const navigate = useNavigate()

  return (
    <NoDataYet
      image={noEventsImage}
      title="No any event yet"
      subtitle="You haven't liked any events yet"
      buttonLabel="Explore other users' events"
      onButtonClick={() => navigate(RoutePaths.home, { state: { activeTab: 1 } })}
    />
  )
}
