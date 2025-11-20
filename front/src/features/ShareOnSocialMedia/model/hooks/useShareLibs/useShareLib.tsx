import { type ComponentType, useContext } from 'react';
import { ShareSocialMediaProvider } from '../../context/ShareSocialMediaProvider.tsx';
import {
  ShareMediaContext,
  type ShareMediaPayload
} from '../../context/ShareSocialMediaContext.tsx';
import type { NonNullableFields } from '@/shared/types';

export const withShareProvider = <P extends object>(WrappedComponent: ComponentType<P>) =>
  (props: P) => {
    return (
      <ShareSocialMediaProvider>
        <WrappedComponent {...props}/>
      </ShareSocialMediaProvider>
    )
  }

export const useShareLib  = () => {
  return useContext(ShareMediaContext) as NonNullableFields<ShareMediaPayload>
}

const withShareLibLoaded = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const { isLoaded } = useShareLib()
    if(!isLoaded) return

    return <WrappedComponent {...props}/>
  }
}

export const withShareLib = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return withShareProvider(withShareLibLoaded(WrappedComponent))
}