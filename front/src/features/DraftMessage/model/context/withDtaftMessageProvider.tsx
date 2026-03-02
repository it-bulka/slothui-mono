import { type ComponentType } from 'react';
import { DraftMessageProvider } from '../context/DraftMessageExtrasProvider/DraftMesageExtrasProvider.tsx';
import { DraftMessageTextProvider } from '../context/DraftMessageTextContext/DraftMessageTextProvider.tsx';

export const withDraftMessageProvider = <P extends object>(WrappedComp: ComponentType<P>) => (props: P) => {
  return (
    <DraftMessageProvider>
      <DraftMessageTextProvider>
        <WrappedComp {...props}/>
      </DraftMessageTextProvider>
    </DraftMessageProvider>
  )
}