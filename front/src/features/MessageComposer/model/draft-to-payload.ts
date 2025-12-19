import type { MessageDraft } from './types/message-draft';
import { groupSubmittedAttachments } from './libs';
import type { SubmitGroupAttachments } from './types';
import type { DraftGeo } from './types';
import type { PollDraft } from '../../CreatePoll';
import type { DraftEvent } from '../../CreateEvent';

export interface SubmitPayload {
  attachments?: SubmitGroupAttachments;
  geo?: DraftGeo | null;
  poll?: PollDraft | null;
  event?: DraftEvent | null;
}

export const draftToPayload = (draft: MessageDraft): SubmitPayload => {
  const result: SubmitPayload = {}
  if(draft.attachments && draft.attachments.length > 0) {
    result['attachments'] = groupSubmittedAttachments(draft.attachments)
    return result
  }

  if(draft.geo) {
    result['geo'] = draft.geo
    return result
  }

  if(draft.poll) {
    result['poll'] = draft.poll
    return result
  }

  if(draft.event) {
    result['event'] = draft.event
    return result
  }

  return result;
};
