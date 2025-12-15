import { UploadButton } from '@/shared/ui';
import { memo } from 'react';
import AudioSvg from '@/shared/assets/images/actions/audio.svg?react'

interface UploadAudioButtonProps {
  onFilesSelect: (files: File[]) => void;
}
export const UploadAudioButton = memo(({ onFilesSelect }: UploadAudioButtonProps) => {
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

