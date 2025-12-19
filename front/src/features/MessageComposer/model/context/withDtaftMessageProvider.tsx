import { type ComponentType } from 'react';
import { DraftMessageProvider } from './DraftMessageExtrasProvider/DraftMesageExtrasProvider.tsx';
import { DraftMessageTextProvider } from './DraftMessageTextContext/DraftMessageTextProvider.tsx';

export const withDraftMessageProvider = <P extends object>(WrappedComp: ComponentType<P>) => (props: P) => {
  return (
    <DraftMessageProvider>
      <DraftMessageTextProvider>
        <WrappedComp {...props}/>
      </DraftMessageTextProvider>
    </DraftMessageProvider>
  )
}