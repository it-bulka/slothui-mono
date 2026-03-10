import { createEntityAdapter } from '@reduxjs/toolkit';
import type { RootState } from '@/app/config';
import type { PollDetailsEntity } from '@/entities/Poll/model/type/pollDetails.state.ts';

export const pollDetailsAdapter = createEntityAdapter<PollDetailsEntity, string>({
  selectId: (poll) => poll.id
})

export const pollDetailsSelectors = pollDetailsAdapter.getSelectors((state: RootState) => state.pollDetails)