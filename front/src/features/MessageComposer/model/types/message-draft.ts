import type { DraftAttachment } from './draft-attachments.types.ts';
import type { DraftGeo } from './draft-geo.ts';
import type { PollDraft } from '../../../CreatePoll';

export type MessageDraft = {
  text: string;
  attachments: DraftAttachment[];
  geo?: DraftGeo | null;
  poll?: PollDraft | null;
}