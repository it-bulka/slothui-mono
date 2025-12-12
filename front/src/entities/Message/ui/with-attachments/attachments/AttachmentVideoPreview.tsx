import type { Attachment } from '../../../model/type/attachment.dto.ts';
import css from '../content/MediaGrid/ImagesGrid.module.css'

type IAttachmentVideo = Pick<Attachment, 'url' | 'originalName'> & {
  className?: string;
  onClick?: () => void;
}
export const AttachmentVideoPreview = ({ onClick, url, originalName }: IAttachmentVideo) => {
  return (
    <div className={css.item} onClick={onClick}>
      <img src={url} alt={originalName || 'image'} className="w-full h-full object-cover" />
      <div className={css.playOverlay}>▶</div>
    </div>
  );
};
