import type { DraftAttachment } from './draft-attachments.types.ts';
import type { DraftGeo } from './draft-geo.ts';
import type { PollDraft } from '../../../CreatePoll';
import type { DraftEvent } from '../../../CreateEvent/model/types/event.type.ts';

export type MessageDraft = {
  attachments: DraftAttachment[];
  geo?: DraftGeo | null;
  poll?: PollDraft | null;
  event?: DraftEvent | null;
}