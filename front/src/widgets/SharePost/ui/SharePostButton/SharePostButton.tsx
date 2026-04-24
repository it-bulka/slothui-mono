import { ShareButton } from '@/shared/ui';

interface SharePostButtonProps {
  onClick: () => void;
}
export const SharePostButton = ({
  onClick
}: SharePostButtonProps) => {
  //TODO: add dynamic amount of sharing

  return <ShareButton onClick={onClick}>
    Shares
  </ShareButton>
}