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
  return (
    <div className={classnames('relative', className)} onClick={onClick}>
      <img src={url} alt={originalName || 'image'} className="w-full h-full object-cover" />
      <div className={css.playOverlay}>▶</div>
      {additionalComp}
    </div>
  );
};