import type { ContactPlatform, ContactType } from '@/shared/types/contacts.types';
import LinkIcon from '@/shared/assets/images/contacts/link.svg?react';
import PhoneIcon from '@/shared/assets/images/events-notification/phone.svg?react';
import GithubIcon from '@/shared/assets/images/contacts/github.svg?react';
import InstagramIcon from '@/shared/assets/images/contacts/instagram.svg?react';
import TelegramIcon from '@/shared/assets/images/contacts/telegram.svg?react';
import FacebookIcon from '@/shared/assets/images/contacts/facebook.svg?react';
import LinkedinIcon from '@/shared/assets/images/contacts/linkedin.svg?react';
import YoutubeIcon from '@/shared/assets/images/contacts/youtube.svg?react';
import DiscordIcon from '@/shared/assets/images/contacts/discord.svg?react';
import TiktokIcon from '@/shared/assets/images/contacts/tiktok.svg?react';
import RedditIcon from '@/shared/assets/images/contacts/reddit.svg?react';
import TwitchIcon from '@/shared/assets/images/contacts/twitch.svg?react';
import EmailIcon from '@/shared/assets/images/contacts/email.svg?react';
// import XIcon from '@/shared/assets/images/contacts/x.svg?react'; // add x.svg to enable

type SvgComponent = React.FC<React.SVGProps<SVGSVGElement>>;

const PLATFORM_ICONS: Partial<Record<ContactPlatform, SvgComponent>> = {
  github: GithubIcon,
  instagram: InstagramIcon,
  telegram: TelegramIcon,
  // x: XIcon,
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
  discord: DiscordIcon,
  tiktok: TiktokIcon,
  reddit: RedditIcon,
  twitch: TwitchIcon,
  unknown: LinkIcon,
};

interface ContactPlatformIconProps {
  platform: ContactPlatform | null;
  type: ContactType;
  className?: string;
}

export const ContactPlatformIcon = ({
  platform,
  type,
  className = 'w-5 h-5',
}: ContactPlatformIconProps) => {
  if (type === 'phone') return <PhoneIcon className={className} />;
  if (type === 'email') return <EmailIcon className={className} />;

  if (platform && PLATFORM_ICONS[platform]) {
    const Icon = PLATFORM_ICONS[platform]!;
    return <Icon className={className} />;
  }

  return <LinkIcon className={className} />;
};
