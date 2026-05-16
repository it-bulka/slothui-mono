import type { ContactType, ContactPlatform, UserContact } from '@/shared/types/contacts.types';

export type ContactDraft = {
  tempId: string;
  id?: string;
  value: string;
  type: ContactType;
  platform: ContactPlatform | null;
  isDeleted: boolean;
  originalValue?: string;
};

export const mapToDrafts = (contacts: UserContact[]): ContactDraft[] =>
  contacts.map((c) => ({
    tempId: c.id,
    id: c.id,
    value: c.value,
    type: c.type,
    platform: c.platform,
    isDeleted: false,
    originalValue: c.value,
  }));
