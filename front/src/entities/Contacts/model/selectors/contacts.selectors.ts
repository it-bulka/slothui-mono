import type { RootState } from '@/app/config';
import { contactsAdapter } from '../adapter/contacts.adapter';

const baseSelectors = contactsAdapter.getSelectors<RootState>((state) => state.contacts);

export const selectContactsByUserId = (userId: string) => (state: RootState) =>
  baseSelectors.selectAll(state).filter((c) => c.userId === userId);

export const selectContactsLoadingByUser = (userId: string) => (state: RootState) =>
  state.contacts.loadingByUser[userId] ?? false;

export const selectContactsErrorByUser = (userId: string) => (state: RootState) =>
  state.contacts.errorByUser[userId];
