import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';
import { contactsAdapter } from '../adapter/contacts.adapter';

const baseSelectors = contactsAdapter.getSelectors<RootState>((state) => state.contacts);

export const selectContactsByUserId = (userId: string) =>
  createSelector(
    [(state: RootState) => baseSelectors.selectAll(state)],
    (contacts) => contacts.filter((c) => c.userId === userId),
  );

export const selectContactsLoadingByUser = (userId: string) => (state: RootState) =>
  state.contacts.loadingByUser[userId] ?? false;

export const selectContactsErrorByUser = (userId: string) => (state: RootState) =>
  state.contacts.errorByUser[userId];
