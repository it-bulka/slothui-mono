import { Drawer } from '@/shared/ui';
import { PostComments } from '../PostComments/PostComments.tsx';
import { CommentActions } from '../../../CommentActions/CommentActions.tsx';

type Props = {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CommentThreadDrawer = ({ postId, isOpen, onClose }: Props) => (
  <Drawer isOpen={isOpen} onClose={onClose}>
    <div className="flex flex-col h-[calc(100vh-160px)]">
      <div className="overflow-y-auto flex-1 scrollbar-themed pb-4">
        <PostComments postId={postId} />
      </div>
      <CommentActions className="mt-3 pt-3 border-t border-gray-g3" />
    </div>
  </Drawer>
)
