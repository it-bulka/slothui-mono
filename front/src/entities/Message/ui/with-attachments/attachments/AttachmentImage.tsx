import type { Attachment } from '../../../model/type/attachment.dto.ts';

type IAttachmentImage = Pick<Attachment, 'url' | 'originalName'> & {
  className?: string;
}
export const AttachmentImage = ({ url, originalName, className }: IAttachmentImage) => {
  return (
    <div className={className}>
      <img src={url} alt={originalName || 'image'} className="w-full h-full object-cover" />
    </div>
  );
};