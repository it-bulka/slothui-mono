import { createEntityAdapter } from '@reduxjs/toolkit';
import type { PostWithAttachmentsUI } from '../types/posts.type.ts';

export const postsAdapter = createEntityAdapter<PostWithAttachmentsUI, string>({
  selectId: post => post.id,
  sortComparer: false, // backend sorts
})

