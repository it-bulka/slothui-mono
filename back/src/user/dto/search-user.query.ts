import { IsString, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchUsersQueryDto {
  @IsString()
  search: string;

  @IsOptional()
  @IsString()
  cursor?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
