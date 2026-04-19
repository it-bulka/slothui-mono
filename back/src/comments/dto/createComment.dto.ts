import { IsUUID, IsOptional, IsString, ValidateIf } from 'class-validator';
export class CreateCommentDTO {
  @IsUUID()
  postId: string;

  @ValidateIf((o: CreateCommentDTO) => o.parentId != null)
  @IsUUID()
  @IsOptional()
  parentId?: string | null;

  @IsString()
  text: string;
}
