import type { UserShort } from './user.types.ts';
import type { GroupedAttachment } from '../types/attachments.types.ts';

export interface PostBaseDTO {
  id: string;
  isLiked: boolean;
  isSaved: boolean;
  likesCount: number;
  sharesCount: number;
  savedCount: number;
  commentsCount: number;
  text?: string;
  author: UserShort
  createdAt: string;
  updatedAt?: string;
}

export type PostWithAttachmentsDto = PostBaseDTO & {
  attachments: GroupedAttachment;
}