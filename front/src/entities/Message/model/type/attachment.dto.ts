export type AttachmentType = 'images' | 'file' | 'audio' | 'video';
export type Attachment = {
  url: string;
  metadata: Record<string, string | number>;
  publicId: string;
}
export type GroupedAttachment = Record<AttachmentType, Attachment[]>;