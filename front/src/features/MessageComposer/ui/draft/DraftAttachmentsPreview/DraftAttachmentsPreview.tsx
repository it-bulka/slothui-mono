import { AudioList } from '@/features/MessageComposer/ui/draft/AudioList/AudioList.tsx';
import { DocsList } from '@/features/MessageComposer/ui/draft/DocsList/DocsList.tsx';
import { MediaGrid } from '@/features/MessageComposer/ui/draft/MediaGrid/MediaGrid.tsx';
import { useDraftMessageExtras } from '@/features/MessageComposer';

export const DraftAttachmentsPreview = () => {
  const { attachments, groupedDraftAttachments, removeAttachment } = useDraftMessageExtras()
  if(!attachments.length) return null;

  return (
    <div className="max-h-[70vh] overflow-y-auto">
      <div>
        <MediaGrid images={groupedDraftAttachments.images} video={groupedDraftAttachments.video} onDelete={removeAttachment}/>
        <DocsList docs={groupedDraftAttachments.file} onDelete={removeAttachment}/>
        <AudioList list={groupedDraftAttachments.audio} onDelete={removeAttachment}/>
      </div>
    </div>
  )
}