import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkAPI } from '@/shared/config/redux';
import type { PollResultDto } from '@/shared/types/poll.dto.ts';
import type { SelectPollAnswers } from '@/shared/libs/services/pollService/poll.type.ts';

export const answerPollThunk = createAsyncThunk<
  PollResultDto,
  SelectPollAnswers & { parentType: 'message' | 'post', parentId: string },
  ThunkAPI
>(
  'poll/answerPoll',
    async ({ pollId, answerIds }, { rejectWithValue, extra }) => {
      try {
        // TODO: update
        return await extra.services.poll.selectAnswer({ pollId, answerIds })
      } catch (e) {
        return rejectWithValue(
          extra.extractErrorMessage(e, 'Failed to select answer on poll')
        )
      }
    }
)