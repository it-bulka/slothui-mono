import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class TelegramLoginDto {
  @Type(() => Number)
  @IsNumber()
  id: number;

  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  photo_url?: string;

  @Type(() => Number)
  @IsNumber()
  auth_date: number;

  @IsString()
  hash: string;

  @IsOptional()
  @IsString()
  deviceId?: string;
}
