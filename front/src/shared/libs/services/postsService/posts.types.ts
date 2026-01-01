import type { RawGroupedAttachment } from '../../../types';

export interface CreatePostDTO {
  attachments: RawGroupedAttachment;
  text: string;
}

export interface UpdatePostDTO {
  toRemove?: string[];  // ids
  toAdd?: RawGroupedAttachment,
  text?: string;
  postId: string;
}