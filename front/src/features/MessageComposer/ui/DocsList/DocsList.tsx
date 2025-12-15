import { AttachmentDocument } from '@/shared/ui';
import type { DraftAttachment } from '../../model/types';

interface DocsListProps {
  docs:  DraftAttachment[]
  onDelete: (id: string) => void
}
export const DocsList = ({ docs, onDelete }: DocsListProps) => {
  return (
    <div>
      {docs?.map((doc) => (
        <AttachmentDocument
          url={doc.tempUrl}
          size={doc.file.size}
          originalName={doc.file.name}
          additionalComp={(
            <button onClick={() => onDelete(doc.id)} className="px-2">x</button>
          )}
        />
      ))}
    </div>
  )
}