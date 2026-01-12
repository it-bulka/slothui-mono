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
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full bg-black p-5 rounded-lg">
        <CloseButton onClick={onClose} className="ml-auto mr-4 mb-2 bg-gray-g2 text-black" />
        <Swiper
          modules={[Thumbs, Navigation]}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          slidesPerView={1}
          spaceBetween={4}
          navigation
          initialSlide={startIndex}
          className="max-h-[60vh]"
        >
          {list.map((item) => (
            <SwiperSlide key={item.id}>{renderMediaItemWithPlay(item, 'w-full max-w-full max-h-[60vh] object-contain mx-auto')}</SwiperSlide>
          ))}
        </Swiper>

        {/* Prev / Thumb */}
        <Swiper
          modules={[Thumbs, FreeMode, Scrollbar]}
          onSwiper={setThumbsSwiper}
          watchSlidesProgress
          freeMode={true}
          spaceBetween={4}
          slidesPerView={4}
          scrollbar={{ draggable: true }}
          className="max-h-[100px] mt-2"
        >
          {list.map((item) => (
            <SwiperSlide key={item.id}>{renderMediaItem(item)}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Modal>
  )
}