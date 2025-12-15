export type DraftAttachmentType =
  | 'image'
  | 'video'
  | 'audio'
  | 'file';

export interface DraftAttachment {
  id: string;
  file: File;
  tempUrl: string;
  type: DraftAttachmentType;
}

export interface FileWithTempUrl extends File {
  tempUrl: string;
}

export type DraftGroupedAttachments = Record<DraftAttachmentType, DraftAttachment[]>;