import { AttachmentAudio } from '../attachments';
import type { Attachment } from '../../../model/type/attachment.dto.ts';
import { AttachmentList, type AttachmentListProps } from './AttachmentList/AttachmentList.tsx';

type IAudio = Pick<Attachment, 'id' | 'url' | 'originalName' | 'metadata'>
type AudioListProps = Omit<AttachmentListProps<IAudio>, 'renderItem'>

export const AudioList = ({ list, showAll, limit }: AudioListProps) => {
  return (
    <AttachmentList
      list={list}
      showAll={showAll}
      limit={limit}
      renderItem={(d) => {
        return (
          <AttachmentAudio key={d.id} url={d.url} originalName={d.originalName} metadata={d.metadata}/>
        )
      }}
    />
  )
};
