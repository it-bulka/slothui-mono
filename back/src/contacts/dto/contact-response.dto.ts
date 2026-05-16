import type { ContactPlatform, ContactType } from '../entities/contact.entity';

export interface ContactResponseDto {
  id: string;
  userId: string;
  type: ContactType;
  value: string;
  platform: ContactPlatform | null;
  isPrimary: boolean;
  createdAt: string;
}
