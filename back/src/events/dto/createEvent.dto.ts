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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventCategory } from '../enums/event-category.enum';

export class LocationDto {
  @ApiPropertyOptional({ example: '123 Main St' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 50.4501 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: 30.5234 })
  @IsNumber()
  longitude: number;

  @ApiPropertyOptional({ example: 'Kyiv' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: 'Ukraine' })
  @IsOptional()
  @IsString()
  country?: string;
}

export class CreateEventDto {
  @ApiProperty({ example: 'Tech Meetup 2025', maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    example: 'Monthly gathering of local developers.',
    maxLength: 5000,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  description: string;

  @ApiPropertyOptional({ type: () => LocationDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;

  @ApiProperty({
    example: '2025-09-15T18:00:00.000Z',
    description: 'ISO 8601 date string',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiPropertyOptional({ enum: EventCategory, example: EventCategory.BUSINESS })
  @IsOptional()
  @IsEnum(EventCategory)
  category?: EventCategory;

  @ApiPropertyOptional({
    example: 'https://meet.google.com/abc-defg-hij',
    description: 'Online meeting URL',
  })
  @IsOptional()
  @IsUrl({ require_tld: false }, { message: 'onlineUrl must be a valid URL' })
  onlineUrl?: string;
}
