import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetNotificationsQueryDto {
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
