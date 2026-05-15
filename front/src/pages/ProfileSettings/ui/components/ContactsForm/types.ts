import type { ContactType, ContactPlatform } from '@/shared/types/contacts.types';

export type ContactDraft = {
  tempId: string;
  id?: string;
  value: string;
  type: ContactType;
  platform: ContactPlatform | null;
  isDeleted: boolean;
  originalValue?: string;
};
