export type CreateCommentDTO = {
  text: string
  postId: string
  parentId?: string | null
}

export type GetCommentDto = {
  postId: string
  parentId?: string | null
  cursor?: string | null
}

export type GetReplyDto = {
  postId: string
  parentId: string
  cursor?: string | null
}

export type EditCommentDto = {
  commentId: string
  text: string
}

export interface EditedCommentDTO {
  id: string;
  text: string;
  editedAt: string;
  isEdited: true;
}
