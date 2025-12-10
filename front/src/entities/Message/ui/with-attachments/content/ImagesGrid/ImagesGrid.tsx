import classNames from 'classnames';
import css from './ImagesGrid.module.css';
import { AttachmentImage } from '../../attachments/AttachmentImage';
import { AttachmentVideo } from '../../attachments/AttachmentVideo';
import type { Attachment } from '../../../../model/type/attachment.dto.ts';

interface MediaGridProps {
  list: Attachment[];
  showAll: boolean;
  setShowAll: (v: boolean) => void;
}

const LIMIT = 4;
const renderMediaItem = (item: Attachment, key: string, className?: string) => {
  if (item.type === 'images') {
    return <AttachmentImage key={key} url={item.url} originalName={item.originalName} className={className} />;
  }

  return (
    <AttachmentVideo
      key={key}
      url={item.metadata?.thumbnailUrl || item.url}
      originalName={item.originalName}
      className={className}
    />
  );
};

/** "+N more" */
const MoreItem = ({
  item,
  hiddenCount,
  onClick,
}: {
  item: Attachment;
  hiddenCount: number;
  onClick: () => void;
}) => {
  const thumb = item.type === 'images' ? item.url : item.metadata?.thumbnailUrl;

  return (
    <div className={classNames(css.moreWrapper, css.item)} onClick={onClick}>
      <img src={thumb} alt="" className={css.item} />
      <span className={css.moreOverlay}>+{hiddenCount}</span>
    </div>
  );
};

export const MediaGrid = ({ list, showAll, setShowAll }: MediaGridProps) => {
  const visible = showAll ? list : list.slice(0, LIMIT);
  const hiddenCount = list.length - LIMIT;

  return (
    <div className={css.grid}>
      {visible.map((item, idx) =>
        !showAll && idx === LIMIT - 1 && hiddenCount > 0 ? (
          <MoreItem
            key={item.id}
            item={item}
            hiddenCount={hiddenCount}
            onClick={() => setShowAll(true)}
          />
        ) : (
          renderMediaItem(item, item.id, css.item)
        )
      )}
    </div>
  );
};
