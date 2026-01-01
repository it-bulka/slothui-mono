import type { Attachment } from '../../../../../types';

import { Typography } from '@/shared/ui';
import { shortenMiddle } from '@/shared/libs';
import type { ReactNode } from 'react';

type AttachmentDocumentProps = Pick<Attachment, 'url' | 'originalName'> & {
  size: number;
  additionalComp?: ReactNode
}
export const AttachmentDocument = ({ url, originalName, size, additionalComp }: AttachmentDocumentProps) => {
  return (
    <div className="flex  rounded-sm">
      <div>📄</div>

      <div className="grow">
        <Typography bold className="underline underline-offset-2">{shortenMiddle(originalName)}</Typography>
        <Typography color="secondary">{(size/1024/1024).toFixed(2)} MB</Typography>
      </div>

      <a href={url} download={originalName}>
        ⬇️
      </a>
      {additionalComp}
    </div>
  );
};