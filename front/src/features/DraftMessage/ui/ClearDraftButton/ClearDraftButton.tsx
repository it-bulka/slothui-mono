import { CloseButton } from '@/shared/ui';

export const ClearDraftButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <CloseButton className="absolute top-2 right-2 z-[999999]" onClick={onClick} />
  )
}