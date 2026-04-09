import { Modal } from '@/shared/ui';
import type { Attachment } from '@/shared/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation, Scrollbar, FreeMode } from 'swiper/modules';
import { useState } from 'react';
import {
  renderMediaItem
} from '@/shared/ui/Attachments/ui/atomic/renderMediaItem/renderMediaItem.tsx';
import {
  renderMediaItemWithPlay
} from '@/shared/ui/Attachments/ui/atomic/renderMediaItem/renderMediaItamWithPlay.tsx';
import { Swiper as SwiperType } from 'swiper';
import { CloseButton } from '@/shared/ui';
import css from './MediaAttachmentsModal.module.css';

interface MediaAttachmentsModalProps {
  list: Attachment[];
  isOpen: boolean;
  onClose: () => void;
  startIndex?: number;
}
export const MediaAttachmentsModal = ({
  isOpen,
  onClose,
  list,
  startIndex = 0
}: MediaAttachmentsModalProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} overlayClassName={css.overlay}>
      <div className="flex flex-col bg-zinc-800 rounded-lg p-4 gap-2 overflow-hidden" style={{ height: 'calc(85vh - 2rem)' }}>
        <CloseButton onClick={onClose} className="ml-auto bg-zinc-700 text-white flex-shrink-0" />

        {/* Main swiper */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <Swiper
            modules={[Thumbs, Navigation]}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            slidesPerView={1}
            spaceBetween={4}
            navigation
            initialSlide={startIndex}
            className="h-full"
          >
            {list.map((item) => (
              <SwiperSlide key={item.id} className={css.mainSlide}>
                {renderMediaItemWithPlay(item, css.mainItem)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Thumbs swiper */}
        <div className="flex-shrink-0 h-20">
          <Swiper
            modules={[Thumbs, FreeMode, Scrollbar]}
            onSwiper={setThumbsSwiper}
            watchSlidesProgress
            freeMode
            spaceBetween={4}
            slidesPerView={4}
            scrollbar={{ draggable: true }}
            className="h-full"
          >
            {list.map((item) => (
              <SwiperSlide key={item.id}>
                {renderMediaItem(item, css.thumbItem)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Modal>
  );
};
