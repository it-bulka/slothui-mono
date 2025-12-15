import { type ComponentType } from 'react';
import { DraftMessageProvider } from './DraftMesageProvider.tsx';

export const withDraftMessageProvider = <P extends object>(WrappedComp: ComponentType<P>) => (props: P) => {
  return (
    <DraftMessageProvider>
      <WrappedComp {...props}/>
    </DraftMessageProvider>
  )
}