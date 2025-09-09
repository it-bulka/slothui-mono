import { Suspense } from 'react';
import type { ReactNode, ComponentType } from 'react';

export const withSuspense = <P extends object>(WrappedComp: ComponentType<P>, fallback?: ReactNode) => (props: P) => {
  return (
    <Suspense fallback={fallback || <p>Loading...</p>}>
      <WrappedComp {...props}/>
    </Suspense>
  )
}