export type ContactType = 'email' | 'phone' | 'social';
export type ContactPlatform =
  | 'github'
  | 'instagram'
  | 'telegram'
  | 'x'
  | 'facebook'
  | 'linkedin'
  | 'youtube'
  | 'discord'
  | 'tiktok'
  | 'reddit'
  | 'twitch'
  | 'unknown';

export interface UserContact {
  id: string;
  userId: string;
  type: ContactType;
  value: string;
  platform: ContactPlatform | null;
  isPrimary: boolean;
  createdAt: string;
}

export interface CreateContactDto {
  type: ContactType;
  value: string;
  platform?: ContactPlatform | null;
  isPrimary?: boolean;
}

export interface UpdateContactDto {
  type?: ContactType;
  value?: string;
  platform?: ContactPlatform | null;
  isPrimary?: boolean;
}

export interface SaveContactItem {
  id?: string;
  type: ContactType;
  value: string;
  platform?: ContactPlatform | null;
}
