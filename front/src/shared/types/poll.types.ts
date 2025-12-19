export interface PollOption {
  id: string;
  value: string;
}

export interface Poll {
  question: string;
  options: PollOption[];
  multiple: boolean;
  anonymous: boolean;
}