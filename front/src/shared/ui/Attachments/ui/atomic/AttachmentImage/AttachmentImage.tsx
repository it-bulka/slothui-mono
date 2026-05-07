import type { Attachment } from '../../../../../types';
import type { ReactNode } from 'react';
import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { buildCloudinarySrcSet } from '@/shared/libs/buildCloudinarySrcSet/buildCloudinarySrcSet';

type IAttachmentImage = Pick<Attachment, 'url' | 'originalName'> & {
  className?: string;
  imgClass?: string;
  additionalComp?: ReactNode
  onClick?: () => void;
  fetchPriority?: 'high' | 'low' | 'auto';
}
export const AttachmentImage = ({ url, originalName, className, imgClass, onClick, additionalComp, fetchPriority }: IAttachmentImage) => {
  if (onClick) {
    return (
      <button
        type="button"
        className={`relative ${className} cursor-pointer`}
        onClick={onClick}
        aria-label={`Open ${originalName || 'image'}`}
      >
        <img
          src={url}
          alt={originalName || 'image'}
          className={twMerge(classnames("max-w-full max-h-[200px] object-cover relative", [imgClass]))}
          fetchPriority={fetchPriority}
          srcSet={buildCloudinarySrcSet(url, [200, 400, 600])}
          sizes="(max-width: 640px) 100vw, 400px"
        />
        {additionalComp}
      </button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <img
        src={url}
        alt={originalName || 'image'}
        className={twMerge(classnames("max-w-full max-h-[200px] object-cover relative", [imgClass]))} />
      {additionalComp}
    </div>
  );
};