import {
  IsEnum,
  IsString,
  MaxLength,
  IsOptional,
  IsUUID,
} from 'class-validator';
import {
  ContactPlatform,
  ContactType,
  CONTACT_PLATFORMS,
} from '../entities/contact.entity';

export class SaveContactItem {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsEnum(['email', 'phone', 'social'])
  type: ContactType;

  @IsString()
  @MaxLength(255)
  value: string;

  @IsOptional()
  @IsEnum(CONTACT_PLATFORMS)
  platform?: ContactPlatform;
}
