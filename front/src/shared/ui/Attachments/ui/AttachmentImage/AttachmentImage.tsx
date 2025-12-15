import type { Attachment } from '../../model/type/attachment.dto.ts';
import type { ReactNode } from 'react';
import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';

type IAttachmentImage = Pick<Attachment, 'url' | 'originalName'> & {
  className?: string;
  imgClass?: string;
  additionalComp?: ReactNode
  onClick?: () => void;
}
export const AttachmentImage = ({ url, originalName, className, imgClass, onClick, additionalComp }: IAttachmentImage) => {
  return (
    <div className={className} onClick={onClick}>
      <img
        src={url}
        alt={originalName || 'image'}
        className={twMerge(classnames("w-full h-full object-cover", [imgClass]))} />
      {additionalComp}
    </div>
  );
};