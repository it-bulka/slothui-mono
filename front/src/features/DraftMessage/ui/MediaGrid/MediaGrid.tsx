import { AttachmentImage, AttachmentVideoPreview } from '@/shared/ui';
import type { DraftAttachment } from '../../model/types';
import { DeleteMediaBtn } from './DeleteMediaBtn.tsx';

interface MediaGridProps {
  images?: DraftAttachment[]
  video?: DraftAttachment[]
  onDelete?: (id: string) => void
}

const THUMB_CLASS = 'w-[80px] h-[80px] flex-shrink-0 rounded-xl overflow-hidden';

export const MediaGrid = ({ images = [], video = [], onDelete }: MediaGridProps) => {
  const deleteBtn = (id: string) => <DeleteMediaBtn onDelete={onDelete} itemId={id} />;

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-themed pb-1">
      {images.map((image) => (
        <AttachmentImage
          key={image.id}
          url={image.tempUrl}
          originalName={image.file.name}
          className={THUMB_CLASS}
          imgClass="w-full h-full"
          additionalComp={deleteBtn(image.id)}
        />
      ))}
      {video.map((v) => (
        <AttachmentVideoPreview
          key={v.id}
          url={v.tempUrl}
          originalName={v.file.name}
          className={THUMB_CLASS}
          additionalComp={deleteBtn(v.id)}
        />
      ))}
    </div>
  );
};
