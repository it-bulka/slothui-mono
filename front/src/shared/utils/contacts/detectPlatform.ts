import type { ContactType, ContactPlatform } from '@/shared/types/contacts.types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s\-().]{7,20}$/;

const PLATFORM_PATTERNS: Array<[ContactPlatform, RegExp]> = [
  ['github', /github\.com/i],
  ['instagram', /instagram\.com/i],
  ['telegram', /t\.me/i],
  ['x', /(?:twitter|x)\.com/i],
  ['facebook', /(?:facebook|fb)\.com/i],
  ['linkedin', /linkedin\.com/i],
  ['youtube', /(?:youtube\.com|youtu\.be)/i],
  ['discord', /discord(?:\.gg|app\.com|\.com)/i],
  ['tiktok', /tiktok\.com/i],
  ['reddit', /reddit\.com/i],
  ['twitch', /twitch\.tv/i],
];

export const detectContactMeta = (
  value: string,
): { type: ContactType; platform: ContactPlatform | null } => {
  const trimmed = value.trim();
  if (!trimmed) return { type: 'social', platform: 'unknown' };

  if (EMAIL_REGEX.test(trimmed)) return { type: 'email', platform: null };
  if (PHONE_REGEX.test(trimmed)) return { type: 'phone', platform: null };

  for (const [platform, pattern] of PLATFORM_PATTERNS) {
    if (pattern.test(trimmed)) return { type: 'social', platform };
  }

  return { type: 'social', platform: 'unknown' };
};
