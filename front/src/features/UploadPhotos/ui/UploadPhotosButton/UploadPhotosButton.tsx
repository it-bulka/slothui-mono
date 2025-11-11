import { UploadButton } from '@/shared/ui';
import { memo } from 'react';
import PicturesSvg from '@/shared/assets/images/actions/picture.svg?react'

export const UploadPhotosButton = memo(() => {
  const onFilesSelect = (files: File[])=> {
    const formData = new FormData()

    files.forEach(f => {
      formData.append('files', f)
    })
  }

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

