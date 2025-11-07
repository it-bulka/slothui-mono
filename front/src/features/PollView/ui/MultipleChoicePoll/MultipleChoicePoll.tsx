import { memo } from 'react';
import { PollMode } from '../../model/types';
import {
  MultipleChoiceEditor,
  type MultipleChoiceEditorProps
} from './MultipleChoiceEditor.tsx';
import {
  MultipleChoiceResult,
  type MultipleChoiceResultProps
} from './MultipleChoiceResult.tsx';

export type MultiplePollEditor = MultipleChoiceEditorProps & { mode: PollMode.EDIT}
export type MultiplePollResult = MultipleChoiceResultProps & { mode: PollMode.VIEW }
export type MultipleChoicePollProps = MultiplePollResult | MultiplePollEditor

export const MultipleChoicePoll = memo((props: MultipleChoicePollProps) => {
  if (props.mode === PollMode.EDIT) {
    const { mode: _m, ...rest } = props as MultiplePollEditor;
    return <MultipleChoiceEditor {...rest} />;
  }

  if (props.mode === PollMode.VIEW) {
    const { mode: _m, ...rest } = props as MultiplePollResult;
    return <MultipleChoiceResult {...rest} />;
  }
  return null
})

MultipleChoicePoll.displayName = 'MultipleChoicePoll'