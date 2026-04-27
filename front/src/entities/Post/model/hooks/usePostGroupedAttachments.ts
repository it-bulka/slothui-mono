import { useAppSelector } from '@/shared/config/redux';
import { selectPostGroupedAttachments } from '../selectors/selectPostGroupedAttachments.ts';
import type { RootState } from '@/app/config';

export const usePostGroupedAttachments = (postId: string) =>
  useAppSelector((state: RootState) => selectPostGroupedAttachments(state, postId));
