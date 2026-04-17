import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsDateString,
  IsNumber,
  ValidateNested,
  IsEnum,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EventCategory } from '../enums/event-category.enum';

export class LocationDto {
  @IsOptional()
  @IsString()
  address?: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;
}

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  description: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsOptional()
  @IsEnum(EventCategory)
  category?: EventCategory;

  @IsOptional()
  @IsUrl({ require_tld: false }, { message: 'onlineUrl must be a valid URL' })
  onlineUrl?: string;
}
