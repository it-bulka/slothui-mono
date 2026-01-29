import { AttachmentImage, AttachmentVideoPreview } from '@/shared/ui';
import { CloseButton } from '@/shared/ui';
import type { DraftAttachment } from '@/features/MessageComposer/model/types';

interface MediaGridProps {
  images?: DraftAttachment[]
  video?: DraftAttachment[],
  onDelete?: (id: string) => void
}

export const MediaGrid = ({
  images = [],
  video = [],
  onDelete
}: MediaGridProps) => {
  return (
    <div>
      {images.map((image, index) => (
        <AttachmentImage
          url={image.tempUrl}
          key={index}
          originalName={image.file.name}
          additionalComp={(
            <CloseButton onClick={() => onDelete?.(image.id)}/>
          )}
        />
      ))}

      {video.map((image, index) => (
        <AttachmentVideoPreview
          url={image.tempUrl}
          key={index}
          originalName={image.file.name}
          additionalComp={(
            <CloseButton onClick={() => onDelete?.(image.id)}/>
          )}
        />
      ))}
    </div>
  )
}