import { resendCommentThunk, type ResendCommentArgs } from '../thunk';
import { useAppDispatch } from '@/shared/config/redux';

export const useResendComment = () => {
  const dispatch = useAppDispatch();
  const resendComment = (dto: ResendCommentArgs) => {
    dispatch(resendCommentThunk(dto))
  }
  return { resendComment }
}