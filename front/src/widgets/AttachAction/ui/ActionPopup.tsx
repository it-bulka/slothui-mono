import ContactsSvg from '@/shared/assets/images/actions/contacts.svg?react'
import CameraSvg from '@/shared/assets/images/actions/camera.svg?react'
import {
  CreateEventButton,
  CreateGeoButton,
  CreatePollButton,
  UploadDocumentButton,
  UploadPhotosButton,
  UploadAudioButton
} from '@/features';

import { ActionButton } from '@/shared/ui';
import { useDraftMessage } from '@/features/MessageComposer';
import { useCallback } from 'react';
import type { DraftAttachmentType } from '@/features/MessageComposer/model/types';

//TODO: remove to widgets
export const AttachActionsPopup  = ({ onBtnClick }: { onBtnClick?: () => void}) => {
  const { addAttachments } = useDraftMessage()

  const onFilesSelected = useCallback((type: DraftAttachmentType)=> (files: File[]) => {
    addAttachments(type, files);
    onBtnClick?.();
  }, [addAttachments, onBtnClick]);

  return (
    <div className="grid grid-cols-4 gap-2 bg-white px-2 py-4 rounded-lg border-gray-g2 shadow">
      <UploadPhotosButton onFilesSelect={onFilesSelected('image')} />
      <ActionButton Icon={CameraSvg} column>Camera</ActionButton>
      <CreateGeoButton />
      <ActionButton Icon={ContactsSvg} column>Contacts</ActionButton>
      <UploadDocumentButton onFilesSelect={onFilesSelected('file')}/>
      <UploadAudioButton onFilesSelect={onFilesSelected('audio')}/>
      <CreatePollButton />
      <CreateEventButton />
    </div>
  )
}