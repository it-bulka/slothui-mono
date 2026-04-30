import { IsUUID, IsOptional, IsString, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCommentDTO {
  @ApiProperty({ example: 'uuid-post-1234' })
  @IsUUID()
  postId: string;

  @ApiPropertyOptional({
    example: 'uuid-parent-comment',
    nullable: true,
    description: 'Parent comment ID for threaded replies',
  })
  @ValidateIf((o: CreateCommentDTO) => o.parentId != null)
  @IsUUID()
  @IsOptional()
  parentId?: string | null;

  @ApiProperty({ example: 'Great post!' })
  @IsString()
  text: string;
}
