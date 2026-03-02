import type { Attachment } from '../../../../../types';
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
    <div className={`relative ${className}`} onClick={onClick}>
      <img
        src={url}
        alt={originalName || 'image'}
        className={twMerge(classnames("max-w-full max-h-[200px] object-cover relative", [imgClass]))} />
      {additionalComp}
    </div>
  );
};