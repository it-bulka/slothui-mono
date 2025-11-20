import { Modal, ModalCard } from '@/shared/ui';
import { ShareContent } from '../ShareContent/ShareContent.async.tsx';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

interface ShareSocialMediaProps {
  isOpen: boolean;
  close: () => void;
  titleToShare?: string
  postId: string
}
const sharableLink = import.meta.env.VITE_API_BASE + '/api/share/posts'

const getSharePostLink = (postId: string) => sharableLink + '/' + postId;
export const ShareOnSocialMediaModal = ({
  isOpen,
  close,
  titleToShare,
  postId
 }: ShareSocialMediaProps) => {
  useEffect(() => {
    console.log('------ ShareOnSocialMediaModal ---------');
    console.log('postId:', postId);
    console.log('getSharePostLink:', getSharePostLink(postId));
    if (!postId && isOpen) {
      toast.info('Impossible to share.\nPost not found.');
      close();
    }
  }, [postId, isOpen, close]);

  if (!postId) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} >
      <ModalCard onClose={close} max={false}>
        {isOpen && <ShareContent titleToShare={titleToShare} sharableLink={getSharePostLink(postId)}/>}
      </ModalCard>
    </Modal>
  )
}