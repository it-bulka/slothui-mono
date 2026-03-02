import { CloseButton } from '@/shared/ui';

interface DeleteMediaBtnProps {
  onDelete?: (itemId: string) => void
  itemId: string
}

export const DeleteMediaBtn = ({ onDelete, itemId }: DeleteMediaBtnProps) => {
  return (
    <CloseButton
      onClick={() => onDelete?.(itemId)}
      className="absolute top-0 right-0"
    />

  )
}