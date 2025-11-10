import AudioSvg from '@/shared/assets/images/actions/audio.svg?react'
import DocumentSvg from '@/shared/assets/images/actions/document.svg?react'
import ContactsSvg from '@/shared/assets/images/actions/contacts.svg?react'
import CameraSvg from '@/shared/assets/images/actions/camera.svg?react'
import PicturesSvg from '@/shared/assets/images/actions/picture.svg?react'
import { CreateEventButton, CreateGeoButton, CreatePollButton } from '@/features';

import { ActionButton } from '@/shared/ui';

//TODO: remove to widgets
export const AttachActionsPopup  = () => {
  return (
    <div className="grid grid-cols-4 gap-2 bg-white px-2 py-4 rounded-lg border-gray-g2 shadow">
      <ActionButton Icon={PicturesSvg} column>Photos</ActionButton>
      <ActionButton Icon={CameraSvg} column>Camera</ActionButton>
      <CreateGeoButton />
      <ActionButton Icon={ContactsSvg} column>Contacts</ActionButton>
      <ActionButton Icon={DocumentSvg} column>Document</ActionButton>
      <ActionButton Icon={AudioSvg} column>Audio</ActionButton>
      <CreatePollButton />
      <CreateEventButton />
    </div>
  )
}