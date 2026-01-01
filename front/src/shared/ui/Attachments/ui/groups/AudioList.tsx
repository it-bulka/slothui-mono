import type { Attachment } from '../../../../types';
import { AttachmentList, type AttachmentListProps } from './AttachmentList/AttachmentList.tsx';
import { AttachmentAudio } from '@/shared/ui';

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
          <AttachmentAudio key={d.id} url={d.url} originalName={d.originalName} size={d.metadata?.size}/>
        )
      }}
    />
  )
};
