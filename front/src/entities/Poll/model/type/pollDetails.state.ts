import type { EntityState } from '@reduxjs/toolkit';
import type { UserShort } from '@/shared/types';

export interface AnswerVotersState {
  items: UserShort[]
  loading: boolean
  error?: string
  cursor?: string | null
  hasMore: boolean
}

export interface PollAnswerEntity {
  id: string
  value: string
  index: number
  votes: number
  percentage: number

  voters: AnswerVotersState
}

export interface PollDetailsEntity {
  id: string
  question: string
  multiple: boolean
  anonymous: boolean
  userVote: string[] | null

  answers: PollAnswerEntity[]
}

export interface PollDetailsState extends EntityState<PollDetailsEntity, string> {
  loading: Record<string, boolean>
  error: Record<string, string | undefined>
}