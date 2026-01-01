import { useAppDispatch } from '@/shared/config/redux';
import { addCommentOptimisticThunk, type AddCommentOptimisticArgs } from '../thunk/addOptimisticComment.thunk.ts';

export const useAddOptimisticReply = () => {
  const dispatch = useAppDispatch();
  const addOptimisticReply = (dto: AddCommentOptimisticArgs) => {
    dispatch(addCommentOptimisticThunk(dto))
  }
  return { addOptimisticReply}
}