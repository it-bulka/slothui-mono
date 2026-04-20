import { Drawer } from '@/shared/ui';
import { PostComments } from '../PostComments/PostComments.tsx';
import { CommentActions } from '../../../CommentActions/CommentActions.tsx';
import { useFetchPostComments } from '@/entities/Comment';
import { useAppSelector } from '@/shared/config/redux';
import { selectPostCommentsInitialized } from '@/entities/Comment/model/selectors/selectPostCommentsLoading.ts';
import { useEffect } from 'react';

type Props = {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CommentThreadDrawer = ({ postId, isOpen, onClose }: Props) => {
  const { fetchComments } = useFetchPostComments()
  const isInitialized = useAppSelector(state => selectPostCommentsInitialized(state, postId))

  useEffect(() => {
    if (isOpen && !isInitialized) {
      fetchComments({ postId })
    }
  }, [isOpen, postId, fetchComments, isInitialized])

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-[calc(100vh-160px)]">
        <div className="overflow-y-auto flex-1 scrollbar-themed pb-4">
          <PostComments postId={postId} />
        </div>
        <CommentActions className="mt-3 pt-3 border-t border-gray-g3" />
      </div>
    </Drawer>
  )
}
