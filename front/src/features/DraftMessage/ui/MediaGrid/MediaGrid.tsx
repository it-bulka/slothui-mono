import { AttachmentImage, AttachmentVideoPreview } from '@/shared/ui';
import type { DraftAttachment } from '../../model/types';
import { DeleteMediaBtn } from '../MediaGrid/DeleteMediaBtn.tsx';

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
    <div className={'flex items-center justify-center flex-wrap gap-2'}>
      {images.map((image, index) => (
        <AttachmentImage
          url={image.tempUrl}
          key={index}
          originalName={image.file.name}
          additionalComp={<DeleteMediaBtn onDelete={onDelete} itemId={image.id}/>}
        />
      ))}

      {video.map((image, index) => (
        <AttachmentVideoPreview
          url={image.tempUrl}
          key={index}
          originalName={image.file.name}
          additionalComp={<DeleteMediaBtn onDelete={onDelete} itemId={image.id}/>}
        />
      ))}
    </div>
  )
}