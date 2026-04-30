import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsBoolean,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProfileUpdateDto {
  @ApiPropertyOptional({ example: 'john_doe', minLength: 3, maxLength: 20 })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Username is too short' })
  @MaxLength(20, { message: 'Username is too long' })
  username?: string;

  @ApiPropertyOptional({ example: 'John Doe', minLength: 3, maxLength: 20 })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Username is too short' })
  @MaxLength(20, { message: 'Username is too long' })
  nickname?: string;

  @ApiPropertyOptional({ example: 'Frontend developer', maxLength: 160 })
  @IsOptional()
  @IsString()
  @MaxLength(160, { message: 'Bio is too long' })
  bio?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Avatar image file',
  })
  @IsOptional()
  @Type(() => Object)
  avatarFile?: Express.Multer.File;

  @ApiPropertyOptional({
    description: 'Pass true to remove the current avatar',
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  removeAvatar?: boolean;
}
