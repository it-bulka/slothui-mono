import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetNotificationsQueryDto {
  @IsOptional()
  cursor?: string;

  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
