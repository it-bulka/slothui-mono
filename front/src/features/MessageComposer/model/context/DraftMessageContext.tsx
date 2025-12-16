import { createContext } from 'react';
import type {
  FileWithTempUrl,
  DraftGeo,
  DraftAttachmentType,
  MessageDraft,
  DraftGroupedAttachments
} from '../types';
import type { PollDraft } from '../../../CreatePoll';

export type DraftMessageAttachments = { file: FileWithTempUrl[], images: FileWithTempUrl[], audio: FileWithTempUrl[], video: FileWithTempUrl[] }
interface DraftMessageType {
  draft: MessageDraft;
  setText: (text: string) => void;
  // attachments
  addAttachments: (type: DraftAttachmentType, files: File[]) => void;
  removeAttachment: (fileId: string) => void;
  groupedDraftAttachments: DraftGroupedAttachments;
  // geo
  setGeo: (geo: DraftGeo) => void;
  clearGeo: () => void;
  // poll
  setPoll: (poll: PollDraft) => void;
  clearPoll: () => void;
  // submit
  submit: () => void;

}

export const DraftMessageContext = createContext<DraftMessageType | undefined>(undefined);
