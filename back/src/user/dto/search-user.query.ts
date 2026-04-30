import { IsString, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SearchUsersQueryDto {
  @ApiProperty({
    example: 'john',
    description: 'Username or nickname search term',
  })
  @IsString()
  search: string;

  @ApiPropertyOptional({
    example: 'eyJpZCI6IjEyMyJ9',
    description: 'Cursor for pagination',
  })
  @IsOptional()
  @IsString()
  cursor?: string | null;

  @ApiPropertyOptional({ example: 20, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
