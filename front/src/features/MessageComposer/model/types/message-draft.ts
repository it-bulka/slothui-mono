import type { DraftAttachment } from './draft-attachments.types.ts';
import type { DraftGeo } from './draft-geo.ts';
import type { DraftPoll } from './draft-poll.ts';

export type MessageDraft = {
  text: string;
  attachments: DraftAttachment[];
  geo?: DraftGeo | null;
  poll?: DraftPoll | null;
}