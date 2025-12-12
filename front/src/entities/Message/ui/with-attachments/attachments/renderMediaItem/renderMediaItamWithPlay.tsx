import type { Attachment } from '@/entities/Message/model/type/attachment.dto.ts';
import { AttachmentImage } from '../AttachmentImage.tsx';
import { AttachmentVideo } from '../AttachmentVideo.tsx';

export const renderMediaItemWithPlay = (item: Attachment, className?: string) => {
  if (item.type === 'images') {
    return <AttachmentImage
      key={item.id}
      url={item.url}
      publicId={item.publicId}
      originalName={item.originalName}
      className={className}
      imgClass={className}
      withMoreBtn
    />;
  }

  return (
    <AttachmentVideo
      key={item.id}
      url={item.url}
      originalName={item.originalName}
      publicId={item.publicId}
      className={className}
      videoClass={className}
    />
  );
};