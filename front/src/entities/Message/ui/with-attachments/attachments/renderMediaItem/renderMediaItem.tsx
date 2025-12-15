import type { Attachment } from '@/shared/ui/Attachments/model/type/attachment.dto.ts';
import { AttachmentVideoPreview, AttachmentImage } from '@/shared/ui';

export const renderMediaItem = (item: Attachment, className?: string, onClick?: () => void) => {
  if (item.type === 'images') {
    return <AttachmentImage
      key={item.id}
      url={item.url}
      originalName={item.originalName}
      className={className}
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