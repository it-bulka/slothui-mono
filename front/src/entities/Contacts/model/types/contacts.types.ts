import type { EntityState } from '@reduxjs/toolkit';
import type { UserContact } from '@/shared/types/contacts.types';

export interface ContactsMeta {
  loadingByUser: Record<string, boolean>;
  errorByUser: Record<string, string | undefined>;
  fetchedByUser: Record<string, boolean>;
}

export type ContactsState = EntityState<UserContact, string> & ContactsMeta;
