import { UserShortDTO } from '../../user/dto/user-response.dto';

export interface CommentListItemDTO {
  id: string;
  text: string | null;
  parentId: string | null;
  author: UserShortDTO;
  repliesCount: number;
  createdAt: string;
  editedAt?: string | null;
  isEdited: boolean;
}
