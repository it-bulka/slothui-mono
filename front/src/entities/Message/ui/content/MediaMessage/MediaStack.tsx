import { useState, useCallback } from 'react';
import { MediaAttachmentsModal } from '@/shared/ui';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';
import type { GroupedAttachment } from '@/shared/types';
import cls from './MediaStack.module.css'

type MediaItem = GroupedAttachment['images' | 'video'][number];
interface MediaStackProps {
  media: MediaItem[];
}

export const MediaStack = ({ media }: MediaStackProps) => {
  const visible = media.slice(0, 3);
  const rest = media.length - 3;

  const { isOpen, open, close } = useModalControl();
  const [clickedIndex, setClickedIndex] = useState(0);

  const handlePreviewClick = useCallback((index: number) => () => {
    open();
    setClickedIndex(index);
  }, [open]);

  return (
    <div className={cls.stack}>
      {visible.map((item, index) => (
        <button
          key={item.id}
          className={cls.btn}
          style={{
            transform: `rotate(${index * -5}deg) translate(${index * 8}px, ${index * 4}px)`,
            zIndex: 10 - index
          }}
          onClick={handlePreviewClick(index)}
        >
          <img
            src={item.url}
            alt={item.originalName}
            className={cls.img}
          />
        </button>
      ))}

      {rest > 0 && (
        <div className={cls.restBadge}>
          <span className={cls.restBadgeInner}>+{rest} more</span>
        </div>
      )}

      <MediaAttachmentsModal isOpen={isOpen} onClose={close} list={media} startIndex={clickedIndex} />
    </div>
  );
};