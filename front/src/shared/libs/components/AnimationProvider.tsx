import {
  createContext,
  type PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
  type ComponentType
} from 'react'

type SpringType = typeof import('@react-spring/web')
type GestureType = typeof import('@use-gesture/react')

interface AnimationContextPayload {
  Spring?: SpringType,
  Gesture?: GestureType,
  isLoaded?: boolean
}

const AnimationContext = createContext({})

// Both libs depend on each other
const getAsyncAnimationModules = async () => {
  return Promise.all([
    import('@react-spring/web'),
    import('@use-gesture/react')
  ])
}

// eslint-disable-next-line react-refresh/only-export-components
const AnimationProvider = ({ children }: PropsWithChildren) => {
  const SpringRef = useRef<SpringType | null>(null)
  const GestureRef = useRef<GestureType | null>(null)
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    getAsyncAnimationModules()
      .then(([Spring, Gesture]) => {
        SpringRef.current = Spring
        GestureRef.current = Gesture
        setLoaded(true)
      })
  }, [])

  const value = useMemo(() => ({
    Spring: SpringRef.current,
    Gesture: GestureRef.current,
    isLoaded
  }), [isLoaded])

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  )
}

export const withAnimationProvider = <P extends object>(WrappedComponent: ComponentType<P>) =>
  (props: P) => {
    return (
      <AnimationProvider>
        <WrappedComponent {...props} />
      </AnimationProvider>
    )
  }

export const useAnimationLibs = () => {
  return useContext(AnimationContext) as Required<AnimationContextPayload>
}
