import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetMessagesQuery {
  @ApiPropertyOptional({
    example: 'eyJpZCI6IjEyMyJ9',
    description: 'Cursor for pagination',
  })
  @IsString()
  @IsOptional()
  cursor?: string | null;

  @ApiPropertyOptional({ example: 50 })
  @IsNumber()
  @IsOptional()
  limit?: number | null;
}
