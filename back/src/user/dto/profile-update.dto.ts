import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsBoolean,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class ProfileUpdateDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Username is too short' })
  @MaxLength(20, { message: 'Username is too long' })
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Username is too short' })
  @MaxLength(20, { message: 'Username is too long' })
  nickname?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160, { message: 'Bio is too long' })
  bio?: string;

  @IsOptional()
  @Type(() => Object)
  avatarFile?: Express.Multer.File;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  removeAvatar?: boolean;
}
