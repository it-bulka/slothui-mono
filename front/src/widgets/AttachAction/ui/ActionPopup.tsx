import ContactsSvg from '@/shared/assets/images/actions/contacts.svg?react'
import CameraSvg from '@/shared/assets/images/actions/camera.svg?react'
import { CreateGeoButton } from '@/features/CreateGeolocation';
import { CreatePollButton, PollDraftProvider, type PollDraft } from '@/features/CreatePoll';
import { UploadDocumentButton } from '@/features/UploadDocument';
import { UploadPhotosButton } from '@/features/UploadPhotos';
import { UploadAudioButton } from '@/features/UploadAudio';

import { ActionButton } from '@/shared/ui/ActionButton';
import { useDraftMessageExtras } from '@/features/DraftMessage';
import React, { useCallback } from 'react';
import type { DraftAttachmentType } from 'src/features/DraftMessage/model/types';
import { GeoDraftProvider } from '@/features/CreateGeolocation/model';
import type { GeoData } from '@/features/CreateGeolocation/model/types/geo.types.tsx';
import { toast } from 'react-toastify'

export type AttachActionKey =
  | 'photos'
  | 'camera'
  | 'geo'
  | 'contacts'
  | 'document'
  | 'audio'
  | 'poll'

const ALL_ACTIONS: readonly AttachActionKey[] = [
  'photos', 'camera', 'geo', 'contacts', 'document', 'audio', 'poll',
]

interface Props {
  onBtnClick?: () => void
  actions?: AttachActionKey[]
}

//TODO: remove to widgets
export const AttachActionsPopup = ({ onBtnClick, actions = ALL_ACTIONS as AttachActionKey[] }: Props) => {
  const { addAttachments, setGeo, setPoll } = useDraftMessageExtras()

  const onFilesSelected = useCallback((type: DraftAttachmentType) => (files: File[]) => {
    const error = addAttachments(type, files);
    if (error) {
      toast.error(error);
      return;
    }
    onBtnClick?.();
  }, [addAttachments, onBtnClick]);

  const onMediaFilesSelected = useCallback((files: File[]) => {
    const images = files.filter(f => f.type.startsWith('image/'));
    const videos = files.filter(f => f.type.startsWith('video/'));
    if (images.length) {
      const err = addAttachments('images', images);
      if (err) { toast.error(err); return; }
    }
    if (videos.length) {
      const err = addAttachments('video', videos);
      if (err) { toast.error(err); return; }
    }
    onBtnClick?.();
  }, [addAttachments, onBtnClick]);

  const onSendGeo = useCallback((geo: GeoData) => {
    setGeo(geo);
    onBtnClick?.();
  }, [setGeo, onBtnClick]);

  const onPollCreate = useCallback((poll: PollDraft) => {
    setPoll(poll);
    onBtnClick?.();
  }, [setPoll, onBtnClick]);

  const actionMap: Record<AttachActionKey, React.ReactNode> = {
    photos:   <UploadPhotosButton onFilesSelect={onMediaFilesSelected} />,
    camera:   <ActionButton Icon={CameraSvg} column>Camera</ActionButton>,
    geo:      <GeoDraftProvider sendGeo={onSendGeo}><CreateGeoButton /></GeoDraftProvider>,
    contacts: <ActionButton Icon={ContactsSvg} column>Contacts</ActionButton>,
    document: <UploadDocumentButton onFilesSelect={onFilesSelected('file')} />,
    audio:    <UploadAudioButton onFilesSelect={onFilesSelected('audio')} />,
    poll:     <PollDraftProvider onPollCreate={onPollCreate}><CreatePollButton /></PollDraftProvider>,
  };

  return (
    <div className="grid grid-cols-4 gap-2 bg-light-l2 px-3 py-4 rounded-[1.25rem] border border-gray-g3 shadow-theme">
      {actions.map((key) => (
        <React.Fragment key={key}>{actionMap[key]}</React.Fragment>
      ))}
    </div>
  );
}
