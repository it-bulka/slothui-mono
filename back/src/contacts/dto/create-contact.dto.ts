import {
  IsEnum,
  IsString,
  MaxLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import {
  ContactPlatform,
  ContactType,
  CONTACT_PLATFORMS,
} from '../entities/contact.entity';

export class CreateContactDto {
  @IsEnum(['email', 'phone', 'social'])
  type: ContactType;

  @IsString()
  @MaxLength(255)
  value: string;

  @IsOptional()
  @IsEnum(CONTACT_PLATFORMS)
  platform?: ContactPlatform;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
}
