import type { Attachment } from '../../../model/type/attachment.dto.ts';
import { MediaMoreAction } from '../actions/MediaMoreAction/MediaMoreAction.tsx';
import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';

type IAttachmentImage = Pick<Attachment, 'url' | 'originalName' | 'publicId'> & {
  className?: string;
  withMoreBtn?: boolean;
  imgClass?: string;
  onClick?: () => void;
}
export const AttachmentImage = ({ onClick, url, originalName, publicId, className, imgClass, withMoreBtn = false }: IAttachmentImage) => {
  return (
    <div className={classnames('relative',[className])} onClick={onClick}>
      <img src={url} alt={originalName || 'image'} className={twMerge(classnames("w-full h-full object-cover", [imgClass]))} />
      {withMoreBtn && <MediaMoreAction className="absolute top-2 right-2" fileUrl={url} filename={originalName} publicId={publicId}/>}
    </div>
  );
};