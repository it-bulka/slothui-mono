import { Modal } from '@/shared/ui';
import { CommentThread } from '../CommentThread/CommentThread.tsx';
import { ModalCard } from '@/shared/ui';
import { CommentActions } from '../../../CommentActions/CommentActions.tsx';

export const CommentThreadModal = ({ isOpen, commentIds, close, postId }: { isOpen: boolean, commentIds: string[], close: () => void, postId: string }) => {

  return (
  <Modal isOpen={isOpen}>
    <ModalCard onClose={close} title={'Comments:'}>
      <CommentThread commentIds={commentIds} postId={postId}/>
      <CommentActions className="mt-5 sticky bottom-0 left-0 right-0"/>
    </ModalCard>
  </Modal>
  )
}