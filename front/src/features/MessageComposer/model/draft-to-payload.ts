import type { MessageDraft } from './types/message-draft';
import { groupSubmittedAttachments } from './libs';
import type { SubmitGroupAttachments } from './types';

export interface SubmitPayload {
  text: string;
  attachments: SubmitGroupAttachments;
  geo?: {
    lat: number;
    lng: number;
    label?: string;
  };
  poll?: {
    question: string;
    options: string[];
    multiple: boolean;
  };
}

export const draftToPayload = (draft: MessageDraft): SubmitPayload => ({
  text: draft.text,
  attachments: groupSubmittedAttachments(draft.attachments),
  geo: draft.geo ?? undefined,
  poll: draft.poll
    ? {
      question: draft.poll.question,
      options: draft.poll.options.map(o => o.text),
      multiple: draft.poll.multiple,
    }
    : undefined,
});
