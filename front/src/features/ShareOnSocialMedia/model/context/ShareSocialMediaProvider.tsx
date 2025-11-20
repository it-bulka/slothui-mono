import {
  useState,
  useEffect,
  useRef,
  useMemo,
  type PropsWithChildren,
} from 'react'
import { ShareMediaContext, type ShareLibType } from './ShareSocialMediaContext.tsx';

const getAsyncShareLib = async () => {
  return import('react-share')
}

export const ShareSocialMediaProvider = ({ children }: PropsWithChildren) => {
  const ShareRef = useRef<ShareLibType | null>(null)
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    getAsyncShareLib()
      .then((shareLib) => {
        ShareRef.current = shareLib
        setLoaded(true)
      })
  }, [])

  const value = useMemo(() => ({
    ShareLib: ShareRef.current,
    isLoaded,
  }), [isLoaded])

  return (
    <ShareMediaContext.Provider value={value}>
      {children}
    </ShareMediaContext.Provider>
  )
}

