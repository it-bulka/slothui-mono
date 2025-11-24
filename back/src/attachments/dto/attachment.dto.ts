import { Attachment } from '../entities/attachment.entity';
export type AttachmentDto = Pick<Attachment, 'url' | 'metadata' | 'publicId'>;
