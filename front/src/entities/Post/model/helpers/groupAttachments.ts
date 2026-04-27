import type { Attachment, AttachmentType, GroupedAttachment } from '@/shared/types';

export function groupAttachments(attachments: Attachment[]): GroupedAttachment {
  const result: GroupedAttachment = { images: [], video: [], audio: [], file: [] };
  for (const att of attachments) {
    result[att.type as AttachmentType].push(att);
  }
  return result;
}
