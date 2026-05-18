import { UploadButton } from '@/shared/ui/UploadButton'
import { Avatar } from '@/shared/ui/Avatar/Avatar';
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