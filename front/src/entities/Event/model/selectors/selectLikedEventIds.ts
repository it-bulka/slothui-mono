import type { RootState } from '@/app/config';

export const selectLikedEventIds = (state: RootState) =>
  state.events.liked.ids ?? []
