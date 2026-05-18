import { NoDataYet } from '@/shared/ui/NoDataYet/NoDataYet'
import noEventsImage from '@/shared/assets/images/general/no_events_2.png'
import { useNavigate } from 'react-router'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx'

export const NoEventsYet = () => {
  const navigate = useNavigate()

  return (
    <NoDataYet
      image={noEventsImage}
      title="No any event yet"
      subtitle="There are no events to show here yet"
      buttonLabel="Explore other users' events"
      onButtonClick={() => navigate(RoutePaths.home, { state: { activeTab: 1 } })}
    />
  )
}
