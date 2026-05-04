import classNames from 'classnames';
import css from './ImagesGrid.module.css';
import {
  renderMediaItem
} from '../../atomic/renderMediaItem/renderMediaItem.tsx';
import type { Attachment } from '../../../../../types';
import {
  MediaAttachmentsModal
} from '../../modal/MediaAttachmentsModal/MediaAttachmentsModal.tsx';
import { useModalControl } from '../../../../Modal/model/useModuleControl.tsx';
import { useState, useCallback } from 'react';

interface MediaGridProps {
  list: Attachment[];
  showAll?: boolean;
}

const LIMIT = 4;

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
    <button
      type="button"
      className={classNames(css.moreWrapper, css.item)}
      onClick={onClick}
      aria-label={`Show ${hiddenCount} more`}
    >
      <img src={thumb} alt="" aria-hidden="true" className={css.item} />
      <span aria-hidden="true" className={css.moreOverlay}>+{hiddenCount}</span>
    </button>
  );
};

export const MediaGrid = ({ list, showAll }: MediaGridProps) => {
  const visible = showAll ? list : list.slice(0, LIMIT);
  const hiddenCount = list.length - LIMIT;

  const { isOpen, open, close } = useModalControl()
  const [clickedIndex, setClickedIndex] = useState(0);

  const handlePreviewClick = useCallback((index: number) => () => {
    open()
    setClickedIndex(index)
  }, [open, setClickedIndex])

  return (
    <>
      <div className={classNames(css.grid, {
        [css.grid2]: visible.length === 2,
        [css.grid3]: visible.length === 3,
        [css.gridCompact]: visible.length >= 4,
      })}>
        {visible.map((item, idx) => {
          const itemClass = idx === 0 ? css.itemFirst : css.item;
          return !showAll && idx === LIMIT - 1 && hiddenCount > 0 ? (
            <MoreItem
              key={item.id}
              item={item}
              hiddenCount={hiddenCount}
              onClick={handlePreviewClick(idx)}
            />
          ) : (
            renderMediaItem(item, itemClass, handlePreviewClick(idx))
          )
        })}
      </div>

      <MediaAttachmentsModal isOpen={isOpen} onClose={close} list={list} startIndex={clickedIndex} />
    </>
  );
};
