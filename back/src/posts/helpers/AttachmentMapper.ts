import { Attachment } from '../../attachments/entities/attachment.entity';
import { GroupedAttachment } from '../../attachments/types/attachments.type';

export class AttachmentMapper {
  static toResponse(attachment: Attachment) {
    return {
      id: attachment.id,
      url: attachment.url,
      publicId: attachment.publicId,
      originalName: attachment.originalName,
      type: attachment.type,
      metadata: attachment.metadata,
    };
  }

  static groupToResponse(attachments: Attachment[]): GroupedAttachment {
    const result: GroupedAttachment = {
      images: [],
      video: [],
      audio: [],
      file: [],
    };

    for (const att of attachments) {
      result[att.type].push(this.toResponse(att));
    }

    return result;
  }
}
