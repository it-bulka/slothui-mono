import { useEffect } from 'react';
import { useAppDispatch } from '@/shared/config/redux';
import { Typography } from '@/shared/ui/Typography/Typography'
import { TypographyTypes } from '@/shared/ui/Typography/typography.types';
import { SidebarInfoCard } from '../SidebarInfoCard.tsx';
import { ContactPlatformIcon } from '@/shared/ui/ContactPlatformIcon/ContactPlatformIcon';
import {
  useContactsSelect,
  fetchContactsThunk,
} from '@/entities/Contacts';
import type { UserContact } from '@/shared/types/contacts.types';

const buildContactHref = (contact: UserContact): string => {
  if (contact.type === 'email') return `mailto:${contact.value}`;
  if (contact.type === 'phone') return `tel:${contact.value}`;
  // For social contacts - if it looks like a URL already, use it directly, otherwise return the value
  if (/^https?:\/\//i.test(contact.value)) return contact.value;
  return contact.value;
};

interface UserContactInformationProps {
  userId: string;
}

export const UserContactInformation = ({ userId }: UserContactInformationProps) => {
  const dispatch = useAppDispatch();
  const { contacts, isLoading } = useContactsSelect(userId);

  useEffect(() => {
    dispatch(fetchContactsThunk({ userId }));
  }, [dispatch, userId]);

  return (
    <SidebarInfoCard title="Contact Information">
      {isLoading && (
        <Typography type={TypographyTypes.P_SM} className="text-gray-g2">
          Loading...
        </Typography>
      )}

      {!isLoading && contacts.length === 0 && (
        <Typography type={TypographyTypes.P_SM} className="text-gray-g2">
          No contact information yet
        </Typography>
      )}

      {!isLoading && contacts.length > 0 && (
        <ul className="flex flex-col gap-2">
          {contacts.map((contact) => {
            const href = buildContactHref(contact);
            const isLink = contact.type === 'email' || contact.type === 'phone' || /^https?:\/\//i.test(contact.value);

            return (
              <li key={contact.id} className="flex items-center gap-2">
                <span className="text-blue-b1 shrink-0">
                  <ContactPlatformIcon
                    type={contact.type}
                    platform={contact.platform}
                    className="w-5 h-5"
                  />
                </span>
                {isLink ? (
                  <a
                    href={href}
                    target={contact.type === 'social' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="text-sm truncate hover:underline text-blue-b1"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <span className="text-sm truncate">{contact.value}</span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </SidebarInfoCard>
  );
};
