import { AudioList } from '@/features/MessageComposer/ui/AudioList/AudioList.tsx';
import { DocsList } from '@/features/MessageComposer/ui/DocsList/DocsList.tsx';
import { MediaGrid } from '@/features/MessageComposer/ui/MediaGrid/MediaGrid.tsx';
import { useDraftMessage } from '@/features/MessageComposer';

export const DraftAttachmentsPreview = () => {
  const { draft: { attachments }, groupedDraftAttachments, removeAttachment } = useDraftMessage()
  if(!attachments.length) return null;

  return (
    <div className="max-h-[70vh] overflow-y-auto">
      <div>
        <MediaGrid images={groupedDraftAttachments.image} video={groupedDraftAttachments.video} onDelete={removeAttachment}/>
        <DocsList docs={groupedDraftAttachments.file} onDelete={removeAttachment}/>
        <AudioList list={groupedDraftAttachments.audio} onDelete={removeAttachment}/>
      </div>
    </div>
  )
}