import { useAppSelector } from '@/shared/config/redux';
import { selectSavedEventIds } from '../selectors/selectSavedEventIds.ts';

export const useSelectSavedEvents = () => {
  const ids = useAppSelector(selectSavedEventIds)
  const items = useAppSelector(state =>
    ids.map(id => state.events.entities[id]).filter(Boolean)
  )
  return { items }
}
