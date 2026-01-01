import { AttachmentVideoPreview } from '../atomic/AttachmentVideoPreview/AttachmentVideoPreview.tsx';
import type { Attachment } from '../../../../types';

interface IVideoGrid {
  list: Attachment[],
  showAll: boolean,
  setShowAll: (arg: boolean) => void
}

export const VideoGrid = ({ list, showAll, setShowAll }: IVideoGrid ) => {
  const LIMIT = 4;

  const visibleList = showAll ? list : list.slice(0, LIMIT);
  const hiddenCount = list.length - LIMIT;

  return (
    <div className="attachments-images-grid">
      {visibleList.map((item, idx) => {
        if (!showAll && idx === LIMIT - 1 && hiddenCount > 0) {
          return (
            <div
              key={item.id}
              className="attachments-images-more"
              onClick={() => setShowAll(true)}
            >
              <video className="attachment-video" controls>
                <source src={item.url} />
              </video>
              <span>+{hiddenCount}</span>
            </div>
          )
        }

        return <AttachmentVideoPreview key={item.id} url={item.url} originalName={item.originalName} />;
      })}
    </div>
  );
};
