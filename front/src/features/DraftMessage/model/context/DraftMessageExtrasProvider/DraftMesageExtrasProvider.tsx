import { useState, type ReactNode, useCallback, useMemo } from 'react';
import { DraftMessageExtrasContext } from './DraftMessageExtrasContext.tsx';
import { deleteTempUrl } from '../../libs/temporalResUrl/deleteTempUrl.tsx';
import { createTempUrl } from '../../libs/temporalResUrl/createTempUrl.tsx';
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
import type { DraftEvent } from '../../../../CreateEvent';

export const DraftMessageProvider = ({ children }: { children: ReactNode }) => {
  const [attachments, setAttachments] = useState<MessageDraft['attachments']>([])
  const [geo, setGeo] = useState<MessageDraft['geo']>(null)
  const [poll, setPoll] = useState<MessageDraft['poll']>(null)
  const [event, setEvent] = useState<MessageDraft['event']>(null)

  const addAttachments = useCallback((type: DraftAttachmentType, files: File[]) => {
    const error = validateAddAttachments(attachments, files, type);
    if (error) return error;
    setAttachments(prev => [
      ...prev,
      ...files.map(file => ({ id: nanoid(), file, type, tempUrl: createTempUrl(file) }))
    ]);
    return null;
  }, [attachments]);

  const removeAttachment = useCallback((id: string) => {
    setAttachments(prev => {
      const target = prev.find(a => a.id === id);
      if (target) deleteTempUrl(target.tempUrl);
      return prev.filter(a => a.id !== id);
    });
  }, []);

  const addGeo = useCallback((geo: DraftGeo) => setGeo(geo), []);
  const clearGeo = useCallback(() => setGeo(null), []);

  const addPoll = useCallback((poll: PollDraft) => setPoll(poll), []);
  const clearPoll = useCallback(() => setPoll(null), []);

  const addEvent = useCallback((event: DraftEvent) => setEvent(event), []);
  const clearEvent = useCallback(() => setEvent(null), []);

  const submit = useCallback(() => {
    if (!attachments.length && !geo && !poll) return;
    return draftToPayload({ attachments, geo, poll });
  }, [attachments, geo, poll]);

  const clearExtras = useCallback(() => {
    setAttachments([]);
    setGeo(null);
    setPoll(null);
    setEvent(null);
  }, []);

  const groupedDraftAttachments = useMemo(() =>
    attachments.reduce((acc, file) => {
      acc[file.type].push(file);
      return acc;
    }, { images: [], file: [], audio: [], video: [] } as DraftGroupedAttachments),
  [attachments]);

  const hasDraftExtras = useMemo(
    () => Boolean(attachments.length || geo || poll || event),
    [attachments, geo, poll, event]
  );

  const value = useMemo(() => ({
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
    hasDraftExtras,
  }), [
    attachments, poll, geo, event,
    addAttachments, removeAttachment,
    addGeo, clearGeo,
    addPoll, clearPoll,
    addEvent, clearEvent,
    submit, clearExtras,
    groupedDraftAttachments, hasDraftExtras,
  ]);

  return (
    <DraftMessageExtrasContext.Provider value={value}>
      {children}
    </DraftMessageExtrasContext.Provider>
  );
};
