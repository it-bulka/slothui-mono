export enum PollMode {
  VIEW = 'VIEW',
  EDIT = 'EDIT'
}

export interface Voter {
  id: string
  name: string
  avatar: string
}

export interface Option {
  id: string
  value: string
  votes: number
  percentage: number
  voters: Voter[]
}

export interface PollChoice {
  question: string
  options: Option[]
  totalVotes: number
  anonymous?: boolean
}

export type PollSingleChoiceResult = PollChoice & {
  userVote: string // option ID
}

export type PollMultipleChoiceResult = PollChoice & {
  userVote: string[] // option IDs
}

export interface PollFullResult {
  options: Option[]
  anonymous?: boolean
}