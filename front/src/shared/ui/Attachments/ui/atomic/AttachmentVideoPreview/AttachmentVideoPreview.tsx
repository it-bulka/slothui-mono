import type { Attachment } from '../../../../../types';
import css from './AttachmentVideoPreview.module.css'
import type { ReactNode } from 'react';

type IAttachmentVideo = Pick<Attachment, 'url' | 'originalName'> & {
  className?: string;
  additionalComp?: ReactNode
  onClick?: () => void;
}
export const AttachmentVideoPreview = ({ url, originalName, additionalComp, onClick }: IAttachmentVideo) => {
  return (
    <div className="relative" onClick={onClick}>
      <img src={url} alt={originalName || 'image'} className="w-full h-full object-cover" />
      <div className={css.playOverlay}>▶</div>
      {additionalComp}
    </div>
  );
};