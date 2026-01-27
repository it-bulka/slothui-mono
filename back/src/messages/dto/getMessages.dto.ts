import { IsString, IsOptional, IsNumber } from 'class-validator';

export class GetMessagesQuery {
  @IsString()
  @IsOptional()
  cursor?: string | null;

  @IsNumber()
  @IsOptional()
  limit?: number | null;
}
