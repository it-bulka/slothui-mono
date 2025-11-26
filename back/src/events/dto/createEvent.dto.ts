import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsDateString,
} from 'class-validator';
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
  @IsString()
  @MaxLength(255)
  location?: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;
}
