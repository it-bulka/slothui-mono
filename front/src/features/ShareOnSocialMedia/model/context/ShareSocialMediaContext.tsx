import { createContext } from 'react';

export type ShareLibType = typeof import('react-share')

export interface ShareMediaPayload {
  ShareLib: ShareLibType | null
  isLoaded: boolean
}

export const ShareMediaContext = createContext<ShareMediaPayload>({
  ShareLib: null,
  isLoaded: false
})