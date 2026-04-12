import type { RootState } from '@/app/config';

export const selectSavedEventIds = (state: RootState) =>
  state.events.saved.ids ?? []
