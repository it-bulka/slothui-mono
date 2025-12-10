import type { Attachment } from '../../../model/type/attachment.dto.ts';
import css from '../content/ImagesGrid/ImagesGrid.module.css'

type IAttachmentVideo = Pick<Attachment, 'url' | 'originalName'> & {
  className?: string;
}
export const AttachmentVideo = ({ url, originalName }: IAttachmentVideo) => {
  return (
    <div className={css.item}>
      <img src={url} alt={originalName || 'image'} className="w-full h-full object-cover" />
      <div className={css.playOverlay}>▶</div>
    </div>
  );
};
