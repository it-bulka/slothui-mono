import type { Attachment } from '../../../../../types';
import css from './AttachmentVideoPreview.module.css'
import classnames from 'classnames';
import type { ReactNode } from 'react';

type IAttachmentVideo = Pick<Attachment, 'url' | 'originalName'> & {
  className?: string;
  additionalComp?: ReactNode
  onClick?: () => void;
}
export const AttachmentVideoPreview = ({ url, originalName, className, additionalComp, onClick }: IAttachmentVideo) => {
  const isBlob = url.startsWith('blob:');
  return (
    <div className={classnames('relative', className)} onClick={onClick}>
      {isBlob ? (
        <video src={url} className="w-full h-full object-cover" muted playsInline preload="metadata" />
      ) : (
        <img src={url} alt={originalName || 'video'} className="w-full h-full object-cover" />
      )}
      <div className={css.playOverlay}>▶</div>
      {additionalComp}
    </div>
  );
};