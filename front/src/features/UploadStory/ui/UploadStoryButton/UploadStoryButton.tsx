import { UploadButton, Avatar } from '@/shared/ui';
import AddSvg from '@/shared/assets/images/general/add-circle.svg?react'

export const UploadStoryButton = () => {
  const onFilesSelect = (files: File[]) => {
    console.log(files);
  }
  return (
    <UploadButton Icon={AddSvg} accept="image/*;video/*" onFilesSelect={onFilesSelect}>
      <Avatar />
    </UploadButton>
  )
}