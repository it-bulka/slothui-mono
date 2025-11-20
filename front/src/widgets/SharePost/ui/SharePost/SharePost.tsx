import { ShareOnSocialMediaModal } from '@/features';
import { useModalControl } from '@/shared/ui/Modal/model/useModuleControl.tsx';
import { SharePostButton } from '../SharePostButton/SharePostButton.tsx';

export const SharePost = ({ postId }: { postId: string }) => {
  const { isOpen, open, close } = useModalControl()
  return (
    <>
      <SharePostButton onClick={open} />
      <ShareOnSocialMediaModal isOpen={isOpen} close={close} postId={postId} />
    </>
  )
}