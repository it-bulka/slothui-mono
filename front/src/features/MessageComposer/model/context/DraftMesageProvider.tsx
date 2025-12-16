import { useState, type ReactNode, useCallback, useMemo } from 'react';
import { DraftMessageContext } from './DraftMessageContext.tsx';
import { deleteTempUrl, createTempUrl } from '../libs';
import { draftToPayload } from '../draft-to-payload.ts';
import { nanoid } from 'nanoid';
import { validateAddAttachments } from '../validation/validation.ts';
import type {
  DraftGeo,
  DraftAttachmentType,
  MessageDraft,
  DraftGroupedAttachments
} from '../types';
import type { PollDraft } from '../../../CreatePoll';
import type { DraftEvent } from '@/features/CreateEvent';

export const DraftMessageProvider = ({ children }: { children: ReactNode }) => {
  const [draft, setDraft] = useState<MessageDraft>({
    text: '',
    attachments: [],
    geo: null,
    poll: null,
  });

  const setText = (text: string) =>
    setDraft(d => ({ ...d, text }));

  const addAttachments = useCallback((
    type: DraftAttachmentType,
    files: File[],
  ) => {
    const error = validateAddAttachments(draft.attachments, files, type);
    if (error) return error;

    setDraft(d => ({
      ...d,
      attachments: [
        ...d.attachments,
        ...files.map(file => ({
          id: nanoid(),
          file,
          type,
          tempUrl: createTempUrl(file),
        })),
      ],
    }));

    return null;
  }, [draft.attachments]);

  const removeAttachment = (id: string) => {
    setDraft(d => {
      const target = d.attachments.find(a => a.id === id);
      if (target) deleteTempUrl(target.tempUrl);

      return {
        ...d,
        attachments: d.attachments.filter(a => a.id !== id),
      };
    });
  };

  const setGeo = (geo: DraftGeo) =>
    setDraft(d => ({ ...d, geo }));

  const clearGeo = () => {
    setDraft(d => ({ ...d, geo: null }));
  }

  const setPoll = (poll: PollDraft) =>
    setDraft(d => ({ ...d, poll }));

  const clearPoll = () =>
    setDraft(d => ({ ...d, poll: null }));

  const setEvent = (event: DraftEvent) =>
    setDraft(d => ({ ...d, event }));

  const clearEvent = () =>
    setDraft(d => ({ ...d, event: null }));

  const submit = () => {
    if (!draft.text && !draft.attachments.length && !draft.geo && !draft.poll) {
      return;
    }

    const payload = draftToPayload(draft);
    console.log('SEND', payload);
  };

  const groupedDraftAttachments = useMemo(() => {
    return draft.attachments?.reduce((acc, file) => {
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
  }, [draft.attachments]);

  console.log('DraftMessageProvider', draft.poll);
  return (
    <DraftMessageContext.Provider value={{
      draft,
      addAttachments,
      removeAttachment,
      setGeo,
      clearGeo,
      setPoll,
      clearPoll,
      setText,
      setEvent,
      clearEvent,
      submit,
      groupedDraftAttachments,
    }}>
      {children}
    </DraftMessageContext.Provider>
  );
};