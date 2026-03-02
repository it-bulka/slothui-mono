import { createContext } from 'react';
import type {
  DraftGeo,
  DraftAttachmentType,
  MessageDraft,
  DraftGroupedAttachments
} from '../../types';
import type { PollDraft } from '../../../../CreatePoll';
import type { DraftEvent } from '../../../../CreateEvent';
import type { SubmitPayload } from '../../draft-to-payload.ts';

// NO text. Too much rerenders. So just extras.
interface DraftMessageExtrasType {// attachments
  attachments: MessageDraft['attachments'];
  addAttachments: (type: DraftAttachmentType, files: File[]) => void;
  removeAttachment: (fileId: string) => void;
  groupedDraftAttachments: DraftGroupedAttachments;
  // geo
  geo: MessageDraft['geo'];
  setGeo: (geo: DraftGeo) => void;
  clearGeo: () => void;
  // poll
  poll: MessageDraft['poll'];
  setPoll: (poll: PollDraft) => void;
  clearPoll: () => void;
  // poll
  event: MessageDraft['event'];
  setEvent: (event: DraftEvent) => void;
  clearEvent: () => void;
  // submit
  submit: () => SubmitPayload | undefined;
  clearExtras: () => void;
  hasDraftExtras: boolean;
}

export const DraftMessageExtrasContext = createContext<DraftMessageExtrasType | undefined>(undefined);
