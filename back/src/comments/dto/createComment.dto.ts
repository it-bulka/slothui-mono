import { IsUUID, IsOptional, IsString } from 'class-validator';
export class CreateCommentDTO {
  @IsUUID()
  postId: string;

  @IsUUID()
  @IsOptional()
  parentId?: string;

  @IsString()
  text: string;
}
