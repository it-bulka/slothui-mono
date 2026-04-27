import type { Poll } from '../../../types';

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
  files: File[];
}

export interface CreatePollPostDTO {
  type: 'poll';
  text?: string;
  poll: Poll;
}

export interface UpdatePostDTO {
  toRemove?: string[];
  toAdd?: File[];
  text?: string;
  postId: string;
}
