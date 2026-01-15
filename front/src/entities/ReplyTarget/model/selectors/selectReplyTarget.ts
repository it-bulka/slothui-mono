import type { RootState } from '@/app/config';

export function selectReplyTarget(state: RootState) {
  return state.replyTarget
}