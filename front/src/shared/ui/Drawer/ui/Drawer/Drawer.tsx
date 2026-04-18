import { useSpring, config, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import {
  memo,
  type PropsWithChildren,
  useCallback,
  useEffect
} from 'react'

import { withAnimationProvider, useAnimationLibs } from '../../../../libs/components/AnimationProvider'
import cls from './Drawer.module.css'

import classnames from 'classnames';
import { Overlay } from '../../../Overlay/Overlay.tsx';
import { Portal } from '../../../Portal/Portal.tsx';

interface DrawerProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const height = window.innerHeight - 100

const DrawerContent = memo(({
  className,
  isOpen = false,
  onClose,
  children
}: PropsWithChildren<DrawerProps>) => {
  const [{ y, bgOpacity }, api] = useSpring(() => ({
    y: isOpen ? 0 : height,
    bgOpacity: isOpen ? 1 : 0
  }))

  const openDrawer = useCallback(() => {
    api.start({ y: 0, bgOpacity: 1, immediate: false })
  }, [api])

  useEffect(() => {
    api.start({ y: isOpen ? 0 : height, bgOpacity: isOpen ? 1 : 0 })
  }, [isOpen])

  const close = (velocity = 0) => {
    api.start({
      y: height,
      bgOpacity: 0,
      immediate: false,
      config: { ...config.stiff, velocity, precision: 0.0001 },
      onResolve: onClose
    })
  }

  const bind = useDrag(
    state => {
      const {
        last,
        velocity: [, vy],
        direction: [, dy],
        movement: [, my],
        cancel
      } = state
      if (my > 70) cancel()

      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          close()
        } else {
          openDrawer()
        }
      } else {
        api.start({ y: my, immediate: true })
      }
    },
    {
      from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true
    }
  )

  return (
    <Portal>
      <animated.div
        style={{ opacity: bgOpacity }}
        className={classnames(cls.drawer, { [cls.opened]: isOpen }, [className, 'app_drawer'])}
      >
        <Overlay onClick={close} />
        <animated.div
          className={cls.sheet}
          style={{ bottom: `calc(-100vh + ${height - 100}px)`, y }}
          {...bind()}
        >
          {children}
        </animated.div>
      </animated.div>
    </Portal>
  )
})

const DrawerWithAnim = memo((props: PropsWithChildren<DrawerProps>) => {
  const { isLoaded } = useAnimationLibs()

  if(!isLoaded) return null
  return <DrawerContent {...props} />
})

export const Drawer = withAnimationProvider(DrawerWithAnim)
