type PollBase = {
  id: string;
  question: string;
  multiple: boolean;
  anonymous: boolean;
}
type Answer = {
  id: string;
  value: string;
  index: number;
}

export type PollDto = PollBase & {
  answers: Answer[];
};