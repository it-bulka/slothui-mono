import type { Attachment } from '@/entities/Message/model/type/attachment.dto.ts';
import { AttachmentImage, AttachmentVideoPreview } from '@/entities/Message/ui/with-attachments/attachments';

export const renderMediaItem = (item: Attachment, className?: string, onClick?: () => void) => {
  if (item.type === 'images') {
    return <AttachmentImage
      key={item.id}
      url={item.url}
      originalName={item.originalName}
      className={className}
      publicId={item.publicId}
      onClick={onClick}
    />;
  }

  return (
    <AttachmentVideoPreview
      key={item.id}
      url={item.metadata?.thumbnailUrl || item.url}
      originalName={item.originalName}
      className={className}
      onClick={onClick}
    />
  );
};