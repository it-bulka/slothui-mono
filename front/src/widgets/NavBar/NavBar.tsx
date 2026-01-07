import { NavbarLink } from './NavbarLink.tsx';
import FeedSvg from '@/shared/assets/images/sidebar/1.feed.svg?react'
import StoriesSvg from '@/shared/assets/images/sidebar/2.stories.svg?react'
import FriendsSvg from '@/shared/assets/images/sidebar/3.friends.svg?react'
import ApiSvg from '@/shared/assets/images/sidebar/4.api.svg?react'
import SubscrptionSvg from '@/shared/assets/images/sidebar/5.subscrption.svg?react'
import SettingsSvg from '@/shared/assets/images/sidebar/6.settings.svg?react'
import HelpSvg from '@/shared/assets/images/sidebar/7.help.svg?react'
import { twMerge } from 'tailwind-merge';
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig.tsx';
import { useNavbarCounts } from './model/hooks/useNavbarCounts.ts';
import type { NavbarListType } from './model/types';

const navLinks: NavbarListType = [
  { Icon: FeedSvg, title: 'Feed', key: 'feed', href: RoutePaths.home },
  { Icon: SubscrptionSvg, title: 'Chats', key: 'chats', href: RoutePaths.chats },
  { Icon: StoriesSvg, title: 'My Posts', key: 'posts', href: RoutePaths.my_posts },
  { Icon: ApiSvg, title: 'My Events', key: 'events', href: RoutePaths.my_events },
  { Icon: FriendsSvg, title: 'Friends', key: 'friends', href: `${RoutePaths.friends}?type=followers` },
  { Icon: SettingsSvg, title: 'Settings', key: 'settings', href: RoutePaths.settings },
  { Icon: HelpSvg, title: 'Help & Support', key: 'help', href: RoutePaths.home }, // TODO: add path for support or change
]

export const NavBar = ({ className }: { className?: string }) => {
  const counts = useNavbarCounts()

  return (
    <>
      <div className={twMerge("flex flex-col justify-start", className)}>
        {navLinks.map(({Icon, title, key, href }) => {
          return <NavbarLink
            Icon={Icon}
            title={title}
            key={key}
            href={href}
            count={counts[key]}
          />
        })}
      </div>
    </>
  )
}