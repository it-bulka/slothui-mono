import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';
import { answerPollThunk } from '../../../Poll';
import type { SelectPollAnswers } from '@/shared/libs/services/pollService/poll.type.ts';
import { toast } from 'react-toastify';

export const useUpdatePollInPost = (postId: string) => {
  const dispatch = useAppDispatch();

  const updatePollInPost = useCallback((arg: SelectPollAnswers) => {
    dispatch(answerPollThunk({ ...arg, parentType: 'post', parentId: postId }))
      .unwrap()
      .catch(() => toast.error('Failed to update poll'));
  }, [dispatch, postId]);

  return { updatePollInPost };
};
