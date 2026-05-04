import type { Attachment } from '../../../../types';
import classnames from 'classnames';
import type { ReactNode } from 'react';

type IAttachmentVideo = Pick<Attachment, 'url' | 'originalName' | 'publicId'> & {
  className?: string;
  videoClass?: string;
  withMoreBtn?: boolean;
  additionalComponent?: ReactNode;
}
export const AttachmentVideo = ({
  url,
  originalName,
  className,
  videoClass,
  additionalComponent
}: IAttachmentVideo) => {
  return (
    <div className={classnames('relative',[className])}>
      <video controls aria-label={originalName} className={videoClass}>
        <source src={url} />
        Your browser does not support the video tag.
      </video>

      {additionalComponent}
    </div>
  );
};
