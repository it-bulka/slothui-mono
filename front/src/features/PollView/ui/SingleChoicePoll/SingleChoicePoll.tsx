import { memo } from 'react';
import { PollMode } from '../../model/types';
import { type SingleChoiceEditorProps, SingleChoiceEditor } from './SingleChoiceEditor.tsx';
import { type SingleChoiceResultProps, SingleChoiceResult } from './SingleChoiceResult.tsx';

export type SinglePollEditor = SingleChoiceEditorProps & { mode: PollMode.EDIT}
export type SinglePollResult = SingleChoiceResultProps & { mode: PollMode.VIEW }
export type SingleChoicePollProps = SinglePollResult | SinglePollEditor

export const SingleChoicePoll = memo((props: SingleChoicePollProps) => {
  if (props.mode === PollMode.EDIT) {
    const { mode: _m, ...rest } = props as SinglePollEditor;
    return <SingleChoiceEditor {...rest} />;
  }

  if (props.mode === PollMode.VIEW) {
    const { mode: _m, ...rest } = props as SinglePollResult;
    return <SingleChoiceResult {...rest} />;
  }
  return null
})

SingleChoicePoll.displayName = 'SingleChoicePoll';