import { NavbarLink } from './NavbarLink.tsx';
import FeedSvg from '@/shared/assets/images/sidebar/1.feed.svg?react'
import StoriesSvg from '@/shared/assets/images/sidebar/2.stories.svg?react'
import FriendsSvg from '@/shared/assets/images/sidebar/3.friends.svg?react'
import ApiSvg from '@/shared/assets/images/sidebar/4.api.svg?react'
import SubscrptionSvg from '@/shared/assets/images/sidebar/5.subscrption.svg?react'
import SettingsSvg from '@/shared/assets/images/sidebar/6.settings.svg?react'
import HelpSvg from '@/shared/assets/images/sidebar/7.help.svg?react'
import { twMerge } from 'tailwind-merge';

const navLinks = [
  { Icon: FeedSvg, title: 'Feed', key: 'feed', count: 10 },
  { Icon: StoriesSvg, title: 'Stories', key: 'stories' },
  { Icon: FriendsSvg, title: 'Friends', key: 'friends', count: 4 },
  { Icon: ApiSvg, title: 'APIs', key: 'apis' },
  { Icon: SubscrptionSvg, title: 'Subscription', key: 'subscription' },
  { Icon: SettingsSvg, title: 'Settings', key: 'settings' },
  { Icon: HelpSvg, title: 'Help & Support', key: 'help' },
]

export const NavBar = ({ className }: { className?: string }) => {
  return (
    <>
      <div className={twMerge("flex flex-col justify-start", className)}>
        {navLinks.map(({Icon, title, key, count }) => {
          // TODO: change href
          return <NavbarLink Icon={Icon} title={title} key={key} href={"/"} count={count}/>
        })}
      </div>
    </>
  )
}