import type { DraftAttachment, SubmitGroupAttachments } from '../../types';

export const groupSubmittedAttachments = (files: DraftAttachment[]): SubmitGroupAttachments =>
  files.map(d => d.file);