import { UploadButton } from '@/shared/ui';
import { memo } from 'react';
import AudioSvg from '@/shared/assets/images/actions/audio.svg?react'

export const UploadAudioButton = memo(() => {
  const onFilesSelect = (files: File[])=> {
    const formData = new FormData()

    files.forEach(f => {
      formData.append('files', f)
    })
  }

  return (
    <>
      <UploadButton
        Icon={AudioSvg}
        column
        aria-label="Upload Audio"
        accept="audio/*"
        onFilesSelect={onFilesSelect}
      >
        Audio
      </UploadButton>
    </>
  )
})

UploadAudioButton.displayName = 'UploadAudioButton';

