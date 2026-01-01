import { deleteUnsentCommentThunk } from '../thunk';
import { useAppDispatch } from '@/shared/config/redux';

export const useDeleteUnsentComment = () => {
  const dispatch = useAppDispatch();

  const deleteUnsentComment = (commentId: string) => {
    dispatch(deleteUnsentCommentThunk({ tempId: commentId }))
  };

  return { deleteUnsentComment };
}