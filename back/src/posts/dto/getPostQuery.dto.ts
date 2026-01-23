import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPostsQueryDto {
  @IsOptional()
  cursor?: string;

  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsString()
  userId: string;
}

export class GetMyPostsQueryDto {
  @IsOptional()
  cursor?: string;

  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
