import { createEntityAdapter } from '@reduxjs/toolkit';
import type { UserContact } from '@/shared/types/contacts.types';

export const contactsAdapter = createEntityAdapter<UserContact, string>({
  selectId: (contact) => contact.id,
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});
