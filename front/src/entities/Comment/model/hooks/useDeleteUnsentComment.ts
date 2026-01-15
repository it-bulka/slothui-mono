import { useAppDispatch, useAppStore } from '@/shared/config/redux';
import { useCallback } from 'react';
import { selectCommentById } from '../selectors/adaptorSelectors.ts';
import { commentsActions } from '../slice/comment.slice.ts';
import { postsActions } from '../../../Post';


export const useDeleteUnsentComment = () => {
  const dispatch = useAppDispatch();
  const store = useAppStore();

  const deleteUnsentComment = useCallback((tempId: string) => {
    const comment = selectCommentById(store.getState(), tempId)
    if (!comment) return;

    dispatch(commentsActions.deleteUnsentComment({ tempId }));

    if (comment.parentId) {
      dispatch(commentsActions.decrementCommentRepliesCount({ commentId: tempId }));
    } else {
      dispatch(postsActions.decrementCommentsCount({ postId: comment.postId }));
    }
  }, [store, dispatch]);

  return { deleteUnsentComment };
}