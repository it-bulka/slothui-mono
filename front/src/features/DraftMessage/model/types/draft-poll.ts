export interface DraftPollOption {
  id: string;
  text: string;
}

export interface DraftPoll {
  question: string;
  options: DraftPollOption[];
  multiple: boolean;
}