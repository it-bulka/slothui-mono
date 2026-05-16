import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { UpdateContactDto } from './dto/update-contact.dto';
import { SaveContactItem } from './dto/save-contacts.dto';
import type { ContactResponseDto } from './dto/contact-response.dto';
import { mapContact } from './contacts-mapper';
import { EventEmitterContactsService } from '../event-emitter/event-emitter-contacts.service';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>,
    private readonly contactsEmitter: EventEmitterContactsService,
  ) {}

  async getByUserId(userId: string): Promise<ContactResponseDto[]> {
    const contacts = await this.contactRepo.find({
      where: { userId },
      order: { createdAt: 'ASC' },
    });
    return contacts.map(mapContact);
  }

  async update(
    contactId: string,
    userId: string,
    dto: UpdateContactDto,
  ): Promise<ContactResponseDto> {
    const contact = await this.contactRepo.findOne({
      where: { id: contactId },
    });
    if (!contact) throw new NotFoundException('Contact not found');
    if (contact.userId !== userId) throw new ForbiddenException();

    Object.assign(contact, dto);
    if ('platform' in dto) contact.platform = dto.platform ?? null;
    await this.contactRepo.save(contact);
    return mapContact(contact);
  }

  async delete(contactId: string, userId: string): Promise<void> {
    const contact = await this.contactRepo.findOne({
      where: { id: contactId },
    });
    if (!contact) throw new NotFoundException('Contact not found');
    if (contact.userId !== userId) throw new ForbiddenException();
    await this.contactRepo.remove(contact);
  }

  async saveAll(
    userId: string,
    items: SaveContactItem[],
  ): Promise<ContactResponseDto[]> {
    const existing = await this.contactRepo.find({ where: { userId } });
    const incomingIds = new Set(items.filter((i) => i.id).map((i) => i.id));

    const toDelete = existing.filter((c) => !incomingIds.has(c.id));
    if (toDelete.length) await this.contactRepo.remove(toDelete);

    for (const item of items) {
      if (item.id) {
        const contact = existing.find((c) => c.id === item.id);
        if (contact) {
          Object.assign(contact, {
            type: item.type,
            value: item.value,
            platform: item.platform ?? null,
          });
          await this.contactRepo.save(contact);
        }
      } else {
        const contact = this.contactRepo.create({
          type: item.type,
          value: item.value,
          platform: item.platform ?? null,
          userId,
        });
        await this.contactRepo.save(contact);
      }
    }

    const result = await this.getByUserId(userId);
    this.contactsEmitter.onContactsUpdated(userId, result);
    return result;
  }
}
