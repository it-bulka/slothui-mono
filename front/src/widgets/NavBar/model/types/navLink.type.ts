import type { SVGProps, FC } from 'react';

export type NavbarLinkType =
  | 'feed'
  | 'chats'
  | 'posts'
  | 'events'
  | 'friends'
  | 'settings'
  | 'help'

export type NavbarListType = {
  Icon: FC<SVGProps<SVGSVGElement>>,
  title: string,
  key: NavbarLinkType,
  href: string
}[]