import { MultipleChoicePoll, type MultipleChoicePollProps } from './MultipleChoicePoll/MultipleChoicePoll.tsx';
import { SingleChoicePoll, type SingleChoicePollProps } from './SingleChoicePoll/SingleChoicePoll.tsx';
import { memo } from 'react';

type SingleChoice = SingleChoicePollProps & { isMultiple?: false }
type MultipleChoice = MultipleChoicePollProps & { isMultiple: true }

type PollViewProps = (SingleChoice | MultipleChoice)

export const PollView = memo((props: PollViewProps) => {
  if(props.isMultiple) {
    const { isMultiple: _m, ...rest } = props;
    return <MultipleChoicePoll {...rest} />
  }

  const { isMultiple: _m, ...rest } = props;
  return <SingleChoicePoll {...rest} />
})

PollView.displayName = 'PollView'