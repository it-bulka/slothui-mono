import { useAppDispatch } from '@/shared/config/redux';
import { useCallback } from 'react';
import { answerPollThunk } from '../../../Poll';
import type { SelectPollAnswers } from '@/shared/libs/services/pollService/poll.type.ts';
import { toast } from 'react-toastify'

export const useUpdatePollInMessage = (msgId: string) => {
  const dispatch = useAppDispatch();

  const updatePollInMessage = useCallback((arg: SelectPollAnswers) => {
     dispatch(answerPollThunk({ ...arg, parentType: 'message', parentId: msgId}))
       .unwrap()
       .catch(() => toast.error('Failed to update poll in message'));
  }, [dispatch, msgId]);

  return { updatePollInMessage}
}