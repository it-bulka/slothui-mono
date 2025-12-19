import { useState, type ReactNode, useCallback, useMemo } from 'react';
import { DraftMessageExtrasContext } from './DraftMessageExtrasContext.tsx';
import { deleteTempUrl, createTempUrl } from '../../libs';
import { draftToPayload } from '../../draft-to-payload.ts';
import { nanoid } from 'nanoid';
import { validateAddAttachments } from '../../validation/validation.ts';
import type {
  DraftGeo,
  DraftAttachmentType,
  MessageDraft,
  DraftGroupedAttachments
} from '../../types';
import type { PollDraft } from '../../../../CreatePoll';
import type { DraftEvent } from '@/features/CreateEvent';

export const DraftMessageProvider = ({ children }: { children: ReactNode }) => {
  const [attachments, setAttachments] = useState<MessageDraft['attachments']>([])
  const [geo, setGeo] = useState<MessageDraft['geo']>(null)
  const [poll, setPoll] = useState<MessageDraft['poll']>(null)
  const [event, setEvent] = useState<MessageDraft['event']>(null)

  const addAttachments = useCallback((
    type: DraftAttachmentType,
    files: File[],
  ) => {
    const error = validateAddAttachments(attachments, files, type);
    if (error) return error;

    setAttachments(prev => ([
      ...prev,
      ...files.map(file => ({
        id: nanoid(),
        file,
        type,
        tempUrl: createTempUrl(file)
      }))
    ]));
  }, [attachments]);

  const removeAttachment = (id: string) => {
    setAttachments(prevAttachments => {
      const target = prevAttachments?.find(a => a.id === id);
      if (target) deleteTempUrl(target.tempUrl);

      return prevAttachments.filter(a => a.id !== id);
    });
  };

  const addGeo = (geo: DraftGeo) => setGeo(geo);
  const clearGeo = () => setGeo(null);

  const addPoll = (poll: PollDraft) => setPoll(poll);
  const clearPoll = () => setPoll(null);

  const addEvent = (event: DraftEvent) => setEvent(event)
  const clearEvent = () => setEvent(null)

  const submit = () => {
    if (!attachments.length && !geo && !poll) {
      return;
    }

    const draft = { attachments, geo, poll }
    const payload = draftToPayload(draft);
    console.log('SEND', payload);
    return payload;
  };

  const clearExtras = useCallback(() => {
    setAttachments([])
    setGeo(null)
    setPoll(null)
    setEvent(null)
  }, [setAttachments, setGeo, setEvent, setPoll])

  const groupedDraftAttachments = useMemo(() => {
    return attachments?.reduce((acc, file) => {
      switch (file.type) {
        case "image":
          acc.image.push(file);
          break;
        case "video":
          acc.video.push(file);
          break;
        case "audio":
          acc.audio.push(file);
          break;
        case "file":
          acc.file.push(file);
          break;
      }

      return acc;
    }, { image: [], file: [], audio: [], video: [] } as DraftGroupedAttachments)
  }, [attachments]);

  const hasDraftExtras = useMemo(() => {
    return Boolean(attachments.length || geo || poll || event)
  }, [attachments, geo, poll, event])

  return (
    <DraftMessageExtrasContext.Provider value={{
      attachments,
      poll,
      geo,
      event,
      addAttachments,
      removeAttachment,
      setGeo: addGeo,
      clearGeo,
      setPoll: addPoll,
      clearPoll,
      setEvent: addEvent,
      clearEvent,
      submit,
      clearExtras,
      groupedDraftAttachments,
      hasDraftExtras
    }}>
      {children}
    </DraftMessageExtrasContext.Provider>
  );
};