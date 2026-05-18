import type { ServicesFacade } from '@/shared/libs/services/ServicesFacade/ServicesFacade.ts';
import type { AppStore } from '@/app/config';
import { contactsActions } from '@/entities/Contacts';
import { selectAuthUserId } from '@/entities/AuthUser';

export function initContactsListeners(services: ServicesFacade, store: AppStore) {
  services.user.onContactsUpdated().subscribe((contacts) => {
    const userId = selectAuthUserId(store.getState());
    if (!userId) return;
    store.dispatch(contactsActions.setContactsForUser({ userId, contacts }));
  });
}
