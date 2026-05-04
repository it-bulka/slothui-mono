import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';
import { SharePostButton } from '../SharePostButton/SharePostButton.tsx';
import { ShareDrawer } from '@/widgets/ShareDrawer';

export const SharePost = ({ postId, showText = true, className }: { postId: string; showText?: boolean, className?: string }) => {
  const { isOpen, open, close } = useModalControl()
  return (
    <>
      <SharePostButton onClick={open} showText={showText} className={className}/>
      <ShareDrawer isOpen={isOpen} onClose={close} payload={{ type: 'post', postId }} />
    </>
  )
}
