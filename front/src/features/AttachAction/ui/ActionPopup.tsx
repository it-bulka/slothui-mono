import PollSvg from '@/shared/assets/images/actions/poll.svg?react'
import EventSvg from '@/shared/assets/images/actions/event.svg?react'
import AudioSvg from '@/shared/assets/images/actions/audio.svg?react'
import DocumentSvg from '@/shared/assets/images/actions/document.svg?react'
import ContactsSvg from '@/shared/assets/images/actions/contacts.svg?react'
import GeoSvg from '@/shared/assets/images/actions/geo.svg?react'
import CameraSvg from '@/shared/assets/images/actions/camera.svg?react'
import PicturesSvg from '@/shared/assets/images/actions/picture.svg?react'
import { PollAction } from '@/features/PollAction';

import { ActionButton } from '@/shared/ui';

export const AttachActionsPopup  = () => {
  return (
    <div className="grid grid-cols-4 gap-2 bg-white px-2 py-4 rounded-lg border-gray-g2 shadow">
      <ActionButton Icon={PicturesSvg} column>Photos</ActionButton>
      <ActionButton Icon={CameraSvg} column>Camera</ActionButton>
      <ActionButton Icon={GeoSvg} column>Geo</ActionButton>
      <ActionButton Icon={ContactsSvg} column>Contacts</ActionButton>
      <ActionButton Icon={DocumentSvg} column>Document</ActionButton>
      <ActionButton Icon={AudioSvg} column>Audio</ActionButton>
      <ActionButton Icon={PollSvg} column>Poll</ActionButton>
      <PollAction />
      <ActionButton Icon={EventSvg} column>Event</ActionButton>
    </div>
  )
}