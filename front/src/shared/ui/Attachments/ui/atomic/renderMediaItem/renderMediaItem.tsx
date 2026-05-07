import type { Attachment } from '../../../../../types';
import { AttachmentVideoPreview } from '../AttachmentVideoPreview/AttachmentVideoPreview.tsx';
import { AttachmentImage } from '../AttachmentImage/AttachmentImage.tsx';

export const renderMediaItem = (
  item: Attachment,
  className?: string,
  onClick?: () => void,
  fetchPriority?: 'high' | 'low' | 'auto'
) => {
  if (item.type === 'images') {
    return <AttachmentImage
      key={item.id}
      url={item.url}
      originalName={item.originalName}
      className={className}
      onClick={onClick}
      fetchPriority={fetchPriority}
    />;
  }

  return (
    <AttachmentVideoPreview
      key={item.id}
      url={item.metadata?.thumbnailUrl || item.url}
      originalName={item.originalName}
      className={className}
      onClick={onClick}
      fetchPriority={fetchPriority}
    />
  );
};