import { ShareButton } from '@/shared/ui/ShareButton';

interface SharePostButtonProps {
  onClick: () => void;
  showText?: boolean;
  className?: string
}
export const SharePostButton = ({
  onClick,
  showText = true,
  className
}: SharePostButtonProps) => {
  //TODO: add dynamic amount of sharing

  return <ShareButton onClick={onClick} className={className}>
    {showText && 'Shares'}
  </ShareButton>
}