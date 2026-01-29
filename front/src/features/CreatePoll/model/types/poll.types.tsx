export type PollDraft = {
  id: string;
  question: string;
  answers: {value: string, id: string }[];
  anonymous: boolean;
  multiple: boolean;
}