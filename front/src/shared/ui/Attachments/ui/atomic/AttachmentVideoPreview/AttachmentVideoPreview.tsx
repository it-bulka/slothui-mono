import type { Attachment } from '../../../../../types';
import css from './AttachmentVideoPreview.module.css'
import classnames from 'classnames';
import type { ReactNode } from 'react';
import { buildCloudinarySrcSet } from '@/shared/libs/buildCloudinarySrcSet/buildCloudinarySrcSet';

type IAttachmentVideo = Pick<Attachment, 'url' | 'originalName'> & {
  className?: string;
  additionalComp?: ReactNode
  onClick?: () => void;
  fetchpriority?: 'high' | 'low' | 'auto';
}
export const AttachmentVideoPreview = ({ url, originalName, className, additionalComp, onClick, fetchpriority }: IAttachmentVideo) => {
  const isBlob = url.startsWith('blob:');
  return (
    <div className={classnames('relative', className)} onClick={onClick}>
      {isBlob ? (
        <video src={url} className="w-full h-full object-cover" muted playsInline preload="metadata" />
      ) : (
        <img
          src={url}
          alt={originalName || 'video'}
          className="w-full h-full object-cover"
          fetchpriority={fetchpriority}
          srcSet={buildCloudinarySrcSet(url, [400, 800, 1200])}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 600px"
        />
      )}
      <div className={css.playOverlay}>▶</div>
      {additionalComp}
    </div>
  );
};