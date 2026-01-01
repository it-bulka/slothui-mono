import type { Attachment } from '../../../../types';
import { AttachmentList, type AttachmentListProps } from './AttachmentList/AttachmentList.tsx';
import { AttachmentDocument } from '@/shared/ui';

type IDocument = Pick<Attachment, 'id' | 'url' | 'originalName' | 'metadata'>
type DocumentsListProps = Omit<AttachmentListProps<IDocument>, 'renderItem'>

export const DocumentsList = ({ list, showAll, limit }: DocumentsListProps) => {
  return (
    <AttachmentList
      list={list}
      showAll={showAll}
      limit={limit}
      renderItem={(d) => <AttachmentDocument key={d.id} url={d.url} originalName={d.originalName} size={d.metadata?.size} />}
    />
  )
};
