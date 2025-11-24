import { Files } from '../../attachments/types/attachments.type';
export interface CreatePostDto {
  text: string;
  files: Partial<Files>;
}
