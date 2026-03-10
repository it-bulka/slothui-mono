import type { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import type { PollDetailsState } from '../type/pollDetails.state'
import { pollDetailsAdapter } from '../slice/pollDetails.adapter'
import { fetchPollDetailsThunk } from '../thunk'
import { mapPollDtoToEntity } from '../helpers/mapPollDtoToEntity.ts';

export const fetchPollDetailsExtraReducer = (
  builder: ActionReducerMapBuilder<PollDetailsState>
) => {
  builder
    .addCase(fetchPollDetailsThunk.pending, (state, action) => {
      const pollId = action.meta.arg

      state.loading[pollId] = true
      state.error[pollId] = undefined
    })

    .addCase(fetchPollDetailsThunk.fulfilled, (state, action) => {
      const entity = mapPollDtoToEntity(action.payload)

      pollDetailsAdapter.upsertOne(state, entity)

      state.loading[entity.id] = false
    })

    .addCase(fetchPollDetailsThunk.rejected, (state, action) => {
      const pollId = action.meta.arg

      state.loading[pollId] = false
      state.error[pollId] = action.payload as string
    })

}