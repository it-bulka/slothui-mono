// features/message-composer/model/validation.ts
import { MESSAGE_LIMITS } from '@/features/MessageComposer/model/config/limits';
import type { DraftAttachment, DraftAttachmentType } from '../types/draft-attachments.types.ts';

const mb = (bytes: number) => bytes / 1024 / 1024;

export const validateAddAttachments = (
  current: DraftAttachment[],
  incoming: File[],
  type: DraftAttachmentType,
): string | null => {
  // total count
  if (current.length + incoming.length > MESSAGE_LIMITS.maxTotalAttachments) {
    return 'Too many attachments';
  }

  // by type
  const byTypeCount = current.filter(a => a.type === type).length;
  if (byTypeCount + incoming.length > MESSAGE_LIMITS.byType[type]) {
    return `Too many ${type} files`;
  }

  // total size
  const currentSize = current.reduce((s, a) => s + a.file.size, 0);
  const incomingSize = incoming.reduce((s, f) => s + f.size, 0);

  if (mb(currentSize + incomingSize) > MESSAGE_LIMITS.maxTotalSizeMb) {
    return 'Total attachments size exceeded';
  }

  return null;
};
