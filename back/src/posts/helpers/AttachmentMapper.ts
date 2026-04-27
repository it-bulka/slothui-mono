import { Attachment } from '../../attachments/entities/attachment.entity';
import { AttachmentDto } from '../../attachments/dto/attachment.dto';

export class AttachmentMapper {
  static toResponse(attachment: Attachment): AttachmentDto {
    return {
      id: attachment.id,
      url: attachment.url,
      order: attachment.order,
      publicId: attachment.publicId,
      originalName: attachment.originalName,
      type: attachment.type,
      metadata: attachment.metadata,
    };
  }
}
