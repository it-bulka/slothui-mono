import { createSelector } from '@reduxjs/toolkit'
import { pollDetailsAdapter } from '../slice/pollDetails.adapter'
import type { RootState } from '@/app/config';

const selectors = pollDetailsAdapter.getSelectors(
  (state: RootState) => state.pollDetails
)

export const selectPollById = (state: RootState, pollId: string) =>
  selectors.selectById(state, pollId)

export const selectPollOptions = createSelector(
  selectPollById,
  (poll) => poll?.answers ?? []
)

export const selectPollAnonymous = createSelector(
  selectPollById,
  (poll) => poll?.anonymous ?? false
)

export const selectPollLoading = (state: RootState, pollId: string) =>
  state.pollDetails.loading[pollId]

export const selectPollError = (state: RootState, pollId: string) =>
  state.pollDetails.error[pollId]