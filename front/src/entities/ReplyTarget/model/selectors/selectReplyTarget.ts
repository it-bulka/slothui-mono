import type { RootState } from '@/app/config';

export const selectReplyTarget = (state: RootState) =>
  state.replyTarget