import type { UserShort } from './user.types.ts';

export interface Comment {
  id: string
  text: string
  postId: string
  parentId?: string | null
  createdAt: string
  repliesCount: number
  author: UserShort
  isEdited: boolean
  updatedAt?: string | null
}

export interface CommentsPaginated {
  items: Comment[]
  nextCursor?: string | null
  hasMore: boolean
}