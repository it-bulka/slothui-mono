export type AttachmentType = 'images' | 'video' | 'audio' | 'file';

export type GroupedAttachment = Record<AttachmentType, File[]>