import { PollMode } from '@/features/PollView/model/types';
import type {
  MultiplePollEditor,
  MultiplePollResult
} from '@/features/PollView/ui/MultipleChoicePoll/MultipleChoicePoll.tsx';
import type { SinglePollEditor, SinglePollResult } from '@/features/PollView/ui/SingleChoicePoll/SingleChoicePoll.tsx';

export const mockMultipleChoicePoll: MultiplePollEditor = {
  mode: PollMode.EDIT,
  question: 'Which gemstone do you like the most?',
  questionId: '1',
  options: [
    { value: 'Ruby' },
    { value: 'Sapphire' },
    { value: 'Emerald' },
    { value: 'Amethyst' },
  ],
};


const voters = [
  { id: '1', name: 'Voter', avatar: 'https://ru.pngtree.com/freebackground/wallpapers-pictures-fhd-winter-tree-in-the-snow-4k_13053027.html' },
  { id: '2', name: 'HHH', avatar: 'https://ru.pngtree.com/freebackground/wallpapers-pictures-fhd-winter-tree-in-the-snow-4k_13053027.html' }
]
const options = [
  { id: '1', value: 'Vanilla', votes: 35, percentage: 35, voters: voters },
  { id: '2', value: 'Chocolate', votes: 45, percentage: 45, voters: voters },
  { id: '3', value: 'Strawberry', votes: 20, percentage: 20, voters: voters },{ id: '1', value: 'Vanilla', votes: 35, percentage: 35, voters: voters },
  { id: '4', value: 'Choco', votes: 45, percentage: 45, voters: voters },
  { id: '5', value: 'Straw', votes: 20, percentage: 20, voters: voters },{ id: '1', value: 'Vanilla', votes: 35, percentage: 35, voters: voters },
  { id: '6', value: 'Cho', votes: 45, percentage: 45, voters: voters },
  { id: '7', value: 'Str', votes: 20, percentage: 20, voters: voters },{ id: '5', value: 'Straw', votes: 20, percentage: 20, voters: voters },{ id: '1', value: 'Vanilla', votes: 35, percentage: 35, voters: voters },
  { id: '8', value: 'Chokkkkk', votes: 45, percentage: 45, voters: voters },
  { id: '9', value: 'Strkkkkk', votes: 20, percentage: 20, voters: voters },
]

export const mockMultipleChoiceResult: MultiplePollResult = {
  mode: PollMode.VIEW,
  question: 'Which ice cream flavors do you like?',
  options,
  totalVotes: 100,
  userVote: ['1', '3'],
}

export const mockSingleChoicePoll: SinglePollEditor = {
  mode: PollMode.EDIT,
  question: 'Which gemstone do you like the most?',
  questionId: '1',
  options: [
    { value: 'Ruby' },
    { value: 'Sapphire' },
    { value: 'Emerald' },
    { value: 'Amethyst' },
  ],
};

export const mockSingleChoiceResult: SinglePollResult = {
  mode: PollMode.VIEW,
  question: 'Which ice cream flavors do you like?',
  options,
  totalVotes: 100,
  userVote: '3',
  anonymous: true
}