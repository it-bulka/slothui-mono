import { createSelector } from '@reduxjs/toolkit';
import { selectPostById } from './adapterSelectors.ts';
import { groupAttachments } from '../helpers/groupAttachments.ts';
import type { RootState } from '@/app/config';
import type { GroupedAttachment } from '@/shared/types';

const EMPTY_GROUPED: GroupedAttachment = { images: [], video: [], audio: [], file: [] };

export const selectPostGroupedAttachments = createSelector(
  (state: RootState, postId: string) => selectPostById(state, postId),
  (post): GroupedAttachment =>
    post?.attachments?.length ? groupAttachments(post.attachments) : EMPTY_GROUPED,
);
