import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetPostsQueryDto {
  @ApiPropertyOptional({
    example: 'eyJpZCI6IjEyMyJ9',
    description: 'Cursor for pagination',
  })
  @IsOptional()
  cursor?: string;

  @ApiPropertyOptional({
    example: 20,
    description: 'Number of items to return',
  })
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @ApiPropertyOptional({
    example: 'uuid-1234',
    description: 'Filter posts by user ID',
  })
  @IsOptional()
  @IsString()
  userId?: string;
}

export class GetMyPostsQueryDto {
  @ApiPropertyOptional({
    example: 'eyJpZCI6IjEyMyJ9',
    description: 'Cursor for pagination',
  })
  @IsOptional()
  cursor?: string;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
