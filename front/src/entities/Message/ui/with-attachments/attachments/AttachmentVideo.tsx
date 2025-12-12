import type { Attachment } from '../../../model/type/attachment.dto.ts';
import { MediaMoreAction } from '@/entities/Message/ui/with-attachments/actions/MediaMoreAction/MediaMoreAction.tsx';
import classnames from 'classnames';

type IAttachmentVideo = Pick<Attachment, 'url' | 'originalName' | 'publicId'> & {
  className?: string;
  videoClass?: string;
  withMoreBtn?: boolean;
}
export const AttachmentVideo = ({
  url,
  originalName,
  withMoreBtn,
  publicId,
  className,
  videoClass
}: IAttachmentVideo) => {
  return (
    <div className={classnames('relative',[className])}>
      <video controls className={videoClass}>
        <source src={url} />
      </video>

      {withMoreBtn && <MediaMoreAction className="absolute top-2 right-2" fileUrl={url} filename={originalName} publicId={publicId} />}
    </div>
  );
};
