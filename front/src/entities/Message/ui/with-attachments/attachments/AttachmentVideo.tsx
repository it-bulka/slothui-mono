import type { Attachment } from '../../../../../shared/ui/Attachments/model/type/attachment.dto.ts';
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
  className,
  videoClass,
  additionalComponent
}: IAttachmentVideo) => {
  return (
    <div className={classnames('relative',[className])}>
      <video controls className={videoClass}>
        <source src={url} />
      </video>

      {additionalComponent}
    </div>
  );
};
