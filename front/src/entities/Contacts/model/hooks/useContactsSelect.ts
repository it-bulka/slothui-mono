import { useAppSelector } from '@/shared/config/redux';
import {
  selectContactsByUserId,
  selectContactsLoadingByUser,
  selectContactsErrorByUser,
} from '../selectors/contacts.selectors';

export const useContactsSelect = (userId: string) => {
  const contacts = useAppSelector(selectContactsByUserId(userId));
  const isLoading = useAppSelector(selectContactsLoadingByUser(userId));
  const error = useAppSelector(selectContactsErrorByUser(userId));
  return { contacts, isLoading, error };
};
