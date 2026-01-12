import { AttachmentAudio } from '@/shared/ui';
import type { DraftAttachment } from '../../model/types';

interface AudioListProps {
  list:  DraftAttachment[]
  onDelete: (id: string) => void
}

export const AudioList = ({ list, onDelete }: AudioListProps) => {
  return (
    <div>
      {list?.map((item) => (
        <AttachmentAudio
          url={item.tempUrl}
          size={item.file.size}
          originalName={item.file.name}
          additionalComp={(
            <button onClick={() => onDelete(item.id)}>x</button>
          )}
          key={item.tempUrl}
        />
      ))}
    </div>
  )
}