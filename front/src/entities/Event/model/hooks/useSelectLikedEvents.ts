import { useAppSelector } from '@/shared/config/redux';
import { selectLikedEventIds } from '../selectors/selectLikedEventIds.ts';

export const useSelectLikedEvents = () => {
  const ids = useAppSelector(selectLikedEventIds)
  const items = useAppSelector(state =>
    ids.map(id => state.events.entities[id]).filter(Boolean)
  )
  return { items }
}
