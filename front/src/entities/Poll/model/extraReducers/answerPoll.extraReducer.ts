import type { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import type { PollDetailsState } from '../type/pollDetails.state'
import { pollDetailsAdapter } from '../slice/pollDetails.adapter'
import { answerPollThunk } from '../thunk'
import { mapPollDtoToEntity } from '../helpers/mapPollDtoToEntity.ts';

export const answerPollExtraReducer = (
  builder: ActionReducerMapBuilder<PollDetailsState>
) => {
  builder
    .addCase(answerPollThunk.pending, (state, action) => {
      const parentId = action.meta.arg.parentId

      state.loading[parentId] = true
      state.error[parentId] = undefined
    })

    .addCase(answerPollThunk.fulfilled, (state, action) => {
      const entity = mapPollDtoToEntity(action.payload)

      pollDetailsAdapter.upsertOne(state, entity)

      state.loading[entity.id] = false
    })

    .addCase(answerPollThunk.rejected, (state, action) => {
      const parentId = action.meta.arg.parentId

      state.loading[parentId] = false
      state.error[parentId] = action.payload as string
    })
}