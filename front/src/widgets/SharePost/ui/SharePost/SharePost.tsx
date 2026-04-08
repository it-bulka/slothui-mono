import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';
import { SharePostButton } from '../SharePostButton/SharePostButton.tsx';
import { ShareDrawer } from '@/widgets/ShareDrawer';

export const SharePost = ({ postId }: { postId: string }) => {
  const { isOpen, open, close } = useModalControl()
  return (
    <>
      <SharePostButton onClick={open} />
      <ShareDrawer isOpen={isOpen} onClose={close} payload={{ type: 'post', postId }} />
    </>
  )
}
