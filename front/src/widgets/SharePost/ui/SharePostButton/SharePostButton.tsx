import { ShareButton } from '@/shared/ui';

interface SharePostButtonProps {
  onClick: () => void;
}
export const SharePostButton = ({
  onClick
}: SharePostButtonProps) => {
  //TODO: add dynamic amount of sharing
  const amount = 268

  return <ShareButton onClick={onClick}>
    {amount} Shares
  </ShareButton>
}