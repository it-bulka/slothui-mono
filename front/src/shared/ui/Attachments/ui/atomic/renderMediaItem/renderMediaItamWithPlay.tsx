import type { Attachment } from '../../../../../types';
import { AttachmentVideo } from '../AttachmentVideo.tsx';
import { MediaMoreAction } from '../MediaMoreAction/MediaMoreAction.tsx';
import { AttachmentImage } from '../AttachmentImage/AttachmentImage.tsx';

export const renderMediaItemWithPlay = (item: Attachment, className?: string) => {
  if (item.type === 'images') {
    return <AttachmentImage
      key={item.id}
      url={item.url}
      originalName={item.originalName}
      className={className}
      imgClass={className}
      additionalComp={(
        <MediaMoreAction
          className="absolute top-2 right-2"
          fileUrl={item.url}
          filename={item.originalName}
          publicId={item.publicId}
        />
      )}
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
      additionalComponent={(
        <MediaMoreAction
          className="absolute top-2 right-2" fileUrl={item.url}
          filename={item.originalName}
          publicId={item.publicId}
        />
      )}
    />
  );
};