export type PollDraft = {
  question: string;
  answers: {value: string}[];
  anonymous: boolean;
  multiple: boolean;
}