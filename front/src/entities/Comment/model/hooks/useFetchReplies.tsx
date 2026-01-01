import { useAppDispatch } from '@/shared/config/redux';
import { fetchReplies } from '../thunk';
import type { GetReplyDto } from '@/shared/libs/services';

export const useFetchReplies = () => {
  const dispatch = useAppDispatch()

  const getReplies = (dto: GetReplyDto) => {
    return dispatch(fetchReplies(dto))
  }

  return { fetchReplies: getReplies }
}