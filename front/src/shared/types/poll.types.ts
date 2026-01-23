export interface PollOption {
  value: string;
}

export interface Poll {
  question: string;
  answers: PollOption[];
  multiple: boolean;
  anonymous: boolean;
}