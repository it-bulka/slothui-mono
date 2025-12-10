import type { Attachment } from '../../../model/type/attachment.dto.ts';
import { Typography } from '@/shared/ui';
import { shortenMiddle } from '@/shared/libs';

export const AttachmentDocument = ({ url, originalName, metadata }: Pick<Attachment, 'url' | 'originalName' | 'metadata'>) => {
  return (
    <div className="flex  rounded-sm">
      <div>📄</div>

      <div className="grow">
        <Typography bold className="underline underline-offset-2">{shortenMiddle(originalName)}</Typography>
        <Typography color="secondary">{(metadata.size/1024/1024).toFixed(2)} MB</Typography>
      </div>

      <a href={url} download={originalName}>
        ⬇️
      </a>
    </div>
  );
};
