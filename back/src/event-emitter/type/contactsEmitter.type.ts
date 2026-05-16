import { ContactsServerEvents } from '../../ws/types/contacts.events';
import type { ContactResponseDto } from '../../contacts/dto/contact-response.dto';
import type { Meta } from './common.type';

type ContactsUpdated = {
  ev: ContactsServerEvents.UPDATED;
  data: ContactResponseDto[];
  meta: Meta & { userId: string };
};

export type ContactsEmitterType = ContactsUpdated;
