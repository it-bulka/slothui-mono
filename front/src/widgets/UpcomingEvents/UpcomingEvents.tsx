import { memo } from 'react';
import { BlockTitle } from '@/widgets/BlockTitle/BlockTitle.tsx';
import { AvatarWithInfo, List } from '@/shared/ui';
import BellSvg from '@/shared/assets/images/events-notification/bell.svg?react'

const events = [
  {
    avatarSrc: '/',
    userPosition: 'some position',
    userName: 'userName'
  }
]

export const UpcomingEvents = memo(() => {
  return (
    <div>
      <BlockTitle
        title="Upcoming Events"
        withMargin
      />

      <List>
        {events.map(({ avatarSrc, userPosition, userName }) => (
          <List.Item btnIcon={BellSvg} key={userName}>
            <AvatarWithInfo src={avatarSrc} position={userPosition} name={userName} titleClass="text-sm text-gray-g1"/>
          </List.Item>
        ))}
      </List>
    </div>
  )
})

UpcomingEvents.displayName = 'UpcomingEvents';