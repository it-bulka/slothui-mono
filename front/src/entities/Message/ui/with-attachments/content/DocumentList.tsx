import { AttachmentDocument } from '../attachments';
import type { Attachment } from '../../../model/type/attachment.dto.ts';
import { AttachmentList, type AttachmentListProps } from './AttachmentList/AttachmentList.tsx';

type IDocument = Pick<Attachment, 'id' | 'url' | 'originalName' | 'metadata'>
type DocumentsListProps = Omit<AttachmentListProps<IDocument>, 'renderItem'>

export const DocumentsList = ({ list, showAll, setShowAll, limit }: DocumentsListProps) => {
  return (
    <AttachmentList
      list={list}
      showAll={showAll}
      setShowAll={setShowAll}
      limit={limit}
      renderItem={(d) => <AttachmentDocument key={d.id} url={d.url} originalName={d.originalName} metadata={d.metadata} />}
    />
  )
};
