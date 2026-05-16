import type { Contact } from './entities/contact.entity';
import type { ContactResponseDto } from './dto/contact-response.dto';

export const mapContact = (contact: Contact): ContactResponseDto => ({
  id: contact.id,
  userId: contact.userId,
  type: contact.type,
  value: contact.value,
  platform: contact.platform,
  isPrimary: contact.isPrimary,
  createdAt: contact.createdAt.toISOString(),
});
