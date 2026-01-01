import { createEntityAdapter } from '@reduxjs/toolkit';
import type { PostWithAttachmentsDto } from '@/shared/types';

export const postsAdapter = createEntityAdapter<PostWithAttachmentsDto, string>({
  selectId: post => post.id,
  sortComparer: false, // backend sorts
})