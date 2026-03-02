import { AudioList } from '../AudioList/AudioList.tsx';
import { DocsList } from '../DocsList/DocsList.tsx';
import { MediaGrid } from '../MediaGrid/MediaGrid.tsx';
import {
  useDraftMessageExtras
} from '../../model/context/DraftMessageExtrasProvider/useDraftMessageExtras.tsx';
import { Typography } from '@/shared/ui';

export const DraftAttachmentsPreview = () => {
  const { attachments, groupedDraftAttachments, removeAttachment } = useDraftMessageExtras()
  if(!attachments.length) return null;

  return (
    <div>
      <Typography bold>Preview</Typography>
      <div className="max-h-[70vh] h-[200px] overflow-y-auto">
        <MediaGrid images={groupedDraftAttachments.images} video={groupedDraftAttachments.video} onDelete={removeAttachment}/>
        <DocsList docs={groupedDraftAttachments.file} onDelete={removeAttachment}/>
        <AudioList list={groupedDraftAttachments.audio} onDelete={removeAttachment}/>
      </div>
    </div>
  )
}