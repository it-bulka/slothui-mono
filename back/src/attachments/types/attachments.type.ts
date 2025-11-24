import { AttachmentDto } from '../dto/attachment.dto';

export type AttachmentType = 'image' | 'file' | 'audio' | 'video';
export type AttachmentParentType = 'post' | 'message';
export type GroupedAttachment = Record<AttachmentType, AttachmentDto[]>;
