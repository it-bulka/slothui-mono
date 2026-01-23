import type { Poll, RawGroupedAttachment } from '../../../types';

export type CreatePostDTO =
  | CreateTextPostDTO
  | CreateFilesPostDTO
  | CreatePollPostDTO;

export interface CreateTextPostDTO {
  type: 'text';
  text: string;
}

export interface CreateFilesPostDTO {
  type: 'files';
  text?: string;
  files: RawGroupedAttachment;
}

export interface CreatePollPostDTO {
  type: 'poll';
  text?: string;
  poll: Poll;
}

export interface UpdatePostDTO {
  toRemove?: string[];  // ids
  toAdd?: RawGroupedAttachment,
  text?: string;
  postId: string;
}