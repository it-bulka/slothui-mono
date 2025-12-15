import { UploadButton } from '@/shared/ui';
import { memo } from 'react';
import PicturesSvg from '@/shared/assets/images/actions/picture.svg?react'

interface UploadPhotosButtonProps {
  onFilesSelect: (files: File[]) => void;
}
export const UploadPhotosButton = memo(({ onFilesSelect}: UploadPhotosButtonProps) => {
  return (
    <>
      <UploadButton
        Icon={PicturesSvg}
        column
        aria-label="Upload Photos"
        accept="images/*"
        onFilesSelect={onFilesSelect}
      >
        Photos
      </UploadButton>
    </>
  )
})

UploadPhotosButton.displayName = 'UploadPhotosButton';

