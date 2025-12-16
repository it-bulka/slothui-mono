import ContactsSvg from '@/shared/assets/images/actions/contacts.svg?react'
import CameraSvg from '@/shared/assets/images/actions/camera.svg?react'
import {
  CreateEventButton,
  CreateGeoButton,
  CreatePollButton,
  UploadDocumentButton,
  UploadPhotosButton,
  UploadAudioButton,
  PollDraftProvider,
  type PollDraft,
  DraftEventProvider,
  type DraftEvent
} from '@/features';

import { ActionButton } from '@/shared/ui';
import { useDraftMessage } from '@/features/MessageComposer';
import { useCallback } from 'react';
import type { DraftAttachmentType } from '@/features/MessageComposer/model/types';
import { GeoDraftProvider } from '@/features/CreateGeolocation/model';
import type { GeoData } from '@/features/CreateGeolocation/model/types/geo.types.tsx';

//TODO: remove to widgets
export const AttachActionsPopup  = ({ onBtnClick }: { onBtnClick?: () => void}) => {
  const { addAttachments, setGeo, setPoll, setEvent } = useDraftMessage()

  const onFilesSelected = useCallback((type: DraftAttachmentType)=> (files: File[]) => {
    addAttachments(type, files);
    onBtnClick?.();
  }, [addAttachments, onBtnClick]);

  const onSendGeo = useCallback((geo: GeoData) => {
    setGeo(geo)
    onBtnClick?.()
  }, [setGeo, onBtnClick]);

  const onPollCreate = useCallback((poll: PollDraft) => {
    setPoll(poll)
    onBtnClick?.()
  }, [setPoll, onBtnClick]);

  const onEventCreate = useCallback((event: DraftEvent) => {
    setEvent(event)
    onBtnClick?.()
  }, [setEvent, onBtnClick]);

  return (
    <div className="grid grid-cols-4 gap-2 bg-white px-2 py-4 rounded-lg border-gray-g2 shadow">
      <UploadPhotosButton onFilesSelect={onFilesSelected('image')} />
      <ActionButton Icon={CameraSvg} column>Camera</ActionButton>
      <GeoDraftProvider sendGeo={onSendGeo}>
        <CreateGeoButton />
      </GeoDraftProvider>
      <ActionButton Icon={ContactsSvg} column>Contacts</ActionButton>
      <UploadDocumentButton onFilesSelect={onFilesSelected('file')}/>
      <UploadAudioButton onFilesSelect={onFilesSelected('audio')}/>
      <PollDraftProvider onPollCreate={onPollCreate}>
        <CreatePollButton />
      </PollDraftProvider>
      <DraftEventProvider onEventCreate={onEventCreate}>
        <CreateEventButton />
      </DraftEventProvider>
    </div>
  )
}