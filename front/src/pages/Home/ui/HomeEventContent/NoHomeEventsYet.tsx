import { NoDataYet } from '@/shared/ui'
import noEventsImage from '@/shared/assets/images/general/no_events_2.png'

export const NoHomeEventsYet = () => (
  <NoDataYet
    image={noEventsImage}
    title="No any event yet"
    subtitle="No events have been created yet"
  />
)
