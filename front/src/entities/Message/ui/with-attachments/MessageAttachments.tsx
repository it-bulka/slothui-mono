import { useMemo, useState } from 'react'
import type { MessageWithAttachmentsDto } from '@/entities/Message/model/type/message.dto.ts';
import { DocumentsList, AudioList, MediaGrid } from './content';

export const MessageAttachments = ({ attachments }: Pick<MessageWithAttachmentsDto, 'attachments'>) => {
  const [showAll, setShowAll] = useState(false);

  const { audioLimit, docLimit } = useMemo(() => {
    const mediaCount = attachments.images.length + attachments.video.length
    const mediaAndAudioCount = mediaCount + attachments.audio.length
    return {
      audioLimit: mediaCount > 4 ? 1 : 4,
      docLimit: mediaAndAudioCount > 4 ? 1 : 4
    }
  }, [attachments])

  return (
    <div className="attachments">
      {/* IMAGES & VIDEOS*/}
      {(attachments.images.length > 0 || attachments.video.length > 0) && (
        <MediaGrid
          list={[...attachments.images, ...attachments.video ]}
          showAll={showAll}
          setShowAll={setShowAll}
        />
      )}

      {/* AUDIO */}
      {attachments.audio.length > 0 && (
        <AudioList list={attachments.audio} showAll={showAll} setShowAll={setShowAll} limit={audioLimit}/>
      )}

      {/* DOCUMENTS */}
      {attachments.file.length > 0 && (
        <DocumentsList list={attachments.file} showAll={showAll} setShowAll={setShowAll} limit={docLimit}/>
      )}
    </div>
  );
};
