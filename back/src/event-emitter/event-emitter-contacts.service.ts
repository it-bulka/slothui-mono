import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { ContactsEmitterType } from './type/contactsEmitter.type';
import { ContactsServerEvents } from '../ws/types/contacts.events';
import type { ContactResponseDto } from '../contacts/dto/contact-response.dto';

@Injectable()
export class EventEmitterContactsService {
  private readonly contacts$ = new Subject<ContactsEmitterType>();

  getEvent() {
    return this.contacts$.asObservable();
  }

  onContactsUpdated(userId: string, contacts: ContactResponseDto[]) {
    this.contacts$.next({
      ev: ContactsServerEvents.UPDATED,
      data: contacts,
      meta: { local: true, userId },
    });
  }
}
